import { ClientProxy } from '@nestjs/microservices';
import { ProductAggregate } from '@product-aggregate';
import { ProductDomainException } from '@product-domain-exceptions';
import { ProductCreatedDomainEvent } from '@product-domain-events';
import { ProductMessageMapper } from '@product-gateway/channel';
import { ProductEventStorePort } from '@product-gateway/driven-ports';
import { ProductNameValueObject } from '@product-value-object';
import { ProductInventoryDomainService } from './product-inventory.domain-service';

export interface CreateProductDomainServiceOptions {
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
    options: CreateProductDomainServiceOptions,
  ): Promise<ProductCreatedDomainEvent> {
    return this.eventStore.runInTransaction(async () => {
      const isProductExist = await this.inventoryService.isProductExist(
        options.name,
      );
      if (isProductExist) {
        throw new ProductDomainException.NameIsExist();
      }

      const product = new ProductAggregate();
      const productCreatedEvent = product.createProduct({
        name: options.name,
      });
      await this.eventStore.save(productCreatedEvent);
      const message = this.mapper.toMessage(productCreatedEvent);
      this.messageBroker.emit(ProductCreatedDomainEvent.name, message);
      // await this.outboxService.addMessage(
      //   message,
      //   ProductCreatedDomainEvent.name,
      // );

      //this.outboxService.sendMessages$().subscribe();

      return productCreatedEvent;
    });
  }
}
