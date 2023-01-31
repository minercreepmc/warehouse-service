import { ClientProxy } from '@nestjs/microservices';
import { ProductAggregate } from '@product-aggregate';
import { ProductBusinessRules } from '@product-business-rules';
import { ProductDomainError } from '@product-domain-errors';
import { ProductCreatedDomainEvent } from '@product-domain-events';
import { ProductMessageMapper } from '@product-gateway/channel';
import { ProductEventStorePort } from '@product-gateway/driven-ports';
import { ProductNameValueObject } from '@product-value-object';

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
