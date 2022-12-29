import { ProductAggregate } from '@aggregates/product/product.aggregate';
import { ProductDomainError } from '@domain-errors/product';
import { ProductEventStorePort } from '@driven-ports/product/product.repository.port';
import type { ProductNameValueObject } from '@value-objects/product';

export interface CreateProductDomainServiceData {
  name: ProductNameValueObject;
}

export class CreateProductDomainService {
  constructor(private readonly eventStore: ProductEventStorePort) {}

  async execute(data: CreateProductDomainServiceData) {
    const found = await this.eventStore.isProductExist(data.name);
    if (found) {
      throw new ProductDomainError.NameIsExist();
    }
    const product = new ProductAggregate();
    const productCreatedEvent = product.createProduct({
      name: data.name,
    });

    this.eventStore.save(productCreatedEvent);
    // publish event

    return productCreatedEvent;
  }
}
