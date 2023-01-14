import { ShipProductsAggregateData } from '@aggregates/product';
import { ProductBusinessRules } from '@business-rules';
import { ProductDomainError } from '@domain-errors/product';
import { ProductsShippedDomainEvent } from '@domain-events/product';
import { ProductMessageMapper } from '@gateway/channel';
import { ProductEventStorePort } from '@gateway/driven-ports/product';
import { ClientProxy } from '@nestjs/microservices';

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
    const product = await this.eventStore.getProduct(data.name);
    if (!product) {
      throw new ProductDomainError.NameIsNotExist();
    }

    if (!this.businessRules.isEnoughToShip(data.name, data.quantity)) {
      throw new ProductDomainError.QuantityIsNotEnough();
    }

    const productsShippedEvent = product.shipProducts(data);
    this.eventStore.save(productsShippedEvent);

    const message = this.mapper.toMessage(productsShippedEvent);
    this.messageBroker.emit(ProductsShippedDomainEvent.name, message);

    return productsShippedEvent;
  }
}
