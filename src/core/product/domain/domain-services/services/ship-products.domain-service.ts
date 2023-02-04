import { ClientProxy } from '@nestjs/microservices';
import { ShipProductsAggregateData } from '@product-aggregate';
import { ProductBusinessRules } from '@product-business-rules';
import { ProductDomainError } from '@product-domain-errors';
import { ProductsShippedDomainEvent } from '@product-domain-events';
import { ProductMessageMapper } from '@product-gateway/channel';
import { ProductEventStorePort } from '@product-gateway/driven-ports';

export interface ShipProductsDomainServiceData
  extends ShipProductsAggregateData {}

export class ShipProductsDomainService {
  constructor(
    private readonly businessRules: ProductBusinessRules,
    private readonly eventStore: ProductEventStorePort,
    private readonly messageBroker: ClientProxy,
    private readonly mapper: ProductMessageMapper,
  ) {}

  async execute(
    data: ShipProductsDomainServiceData,
  ): Promise<ProductsShippedDomainEvent> {
    this.checkForError(data);
    let productsShippedEvent: ProductsShippedDomainEvent;

    this.eventStore.startTransaction();
    try {
      const product = await this.eventStore.getProduct(data.name);
      const productsShippedEvent = product.shipProducts(data);

      this.eventStore.save(productsShippedEvent);

      const message = this.mapper.toMessage(productsShippedEvent);
      this.messageBroker.emit(ProductsShippedDomainEvent.name, message);

      this.eventStore.commitTransaction();
    } catch (error) {
      this.eventStore.rollbackTransaction();
      throw error;
    }
    return productsShippedEvent;
  }

  async checkForError(data: ShipProductsDomainServiceData) {
    if (!this.businessRules.isProductNameExist(data.name)) {
      throw new ProductDomainError.NameIsNotExist();
    }

    if (!this.businessRules.isEnoughToShip(data.name, data.quantity)) {
      throw new ProductDomainError.QuantityIsNotEnough();
    }
  }
}
