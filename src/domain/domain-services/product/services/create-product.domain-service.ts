import { ProductAggregate } from '@aggregates/product/product.aggregate';
import { ProductDomainError } from '@domain-errors/product/product.domain-error';
import { ProductEventStorePort } from '@driven-ports/product/product.repository.port';
import { ProductNameValueObject } from '@value-objects/product';

export interface CreateProductDomainServiceData {
  name: ProductNameValueObject;
}

export class CreateProductDomainService {
  constructor(private readonly eventStore: ProductEventStorePort) {}

  async execute(data: CreateProductDomainServiceData) {
    // check if product exist
    const found = await this.eventStore.isProductExist(data.name);
    if (found) {
      throw new ProductDomainError.NameExist();
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
