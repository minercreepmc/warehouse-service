import { ClientProxy } from '@nestjs/microservices';
import { ProductAggregate } from '@product-aggregate';
import { ProductBusinessRules } from '@product-business-rules';
import { ProductDomainError } from '@product-domain-errors';
import { ProductCreatedDomainEvent } from '@product-domain-events';
import { ProductMessageMapper } from '@product-gateway/channel';
import { ProductEventStorePort } from '@product-gateway/driven-ports';
import { ProductNameValueObject } from '@product-value-object';
import { ProductInventoryDomainService } from './product-inventory.domain-service';

export interface CreateProductDomainServiceData {
  name: ProductNameValueObject;
}

export class CreateProductDomainService {
  constructor(
    private readonly inventoryService: ProductInventoryDomainService,
    private readonly eventStore: ProductEventStorePort,
    private readonly messageBroker: ClientProxy,
    private readonly mapper: ProductMessageMapper,
  ) {}

  async execute(
    data: CreateProductDomainServiceData,
  ): Promise<ProductCreatedDomainEvent> {
    if (!this.inventoryService.isProductExist(data.name)) {
      throw new ProductDomainError.NameIsExist();
    }

    return await this.eventStore.runInTransaction(async () => {
      const product = new ProductAggregate();
      const productCreatedEvent = product.createProduct({
        name: data.name,
      });
      await this.eventStore.save(productCreatedEvent);
      const message = this.mapper.toMessage(productCreatedEvent);
      this.messageBroker.emit(ProductCreatedDomainEvent.name, message);
      // await this.outboxService.addMessage(
      //   message,
      //   ProductCreatedDomainEvent.name,
      // );

      await this.eventStore.commitTransaction();
      //this.outboxService.sendMessages$().subscribe();

      return productCreatedEvent;
    });
  }
}
