import { ProductAggregate } from '@aggregates/product/product.aggregate';
import { ProductBusinessRules } from '@business-rules/product.business-rules';
import { ProductDomainError } from '@domain-errors/product';
import { ProductCreatedDomainEvent } from '@domain-events/product';
import { ProductMessageMapper } from '@gateway/channel';
import { ProductEventStorePort } from '@gateway/driven-ports/product';
import { ClientProxy } from '@nestjs/microservices';
import type { ProductNameValueObject } from '@value-objects/product';

export interface CreateProductDomainServiceData {
  name: ProductNameValueObject;
}

export class CreateProductDomainService {
  constructor(
    private readonly businessRules: ProductBusinessRules,
    private readonly eventStore: ProductEventStorePort,
    private readonly messageBroker: ClientProxy,
    private readonly mapper: ProductMessageMapper,
  ) {}

  async execute(data: CreateProductDomainServiceData) {
    if (!this.businessRules.isProductNameExist(data.name)) {
      throw new ProductDomainError.NameIsExist();
    }

    const product = new ProductAggregate();
    const productCreatedEvent = product.createProduct({
      name: data.name,
    });

    await this.eventStore.save(productCreatedEvent);

    const message = this.mapper.toMessage(productCreatedEvent);
    this.messageBroker.emit(ProductCreatedDomainEvent.name, message);

    return productCreatedEvent;
  }
}
