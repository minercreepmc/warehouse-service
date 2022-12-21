import { ProductAggregate } from '@aggregates/product/product.aggregate';
import { ProductNameValueObject } from '@value-objects/product';

export interface CreateProductDomainServiceProps {
  name: ProductNameValueObject;
}

export class CreateProductDomainService {
  async execute(props: CreateProductDomainServiceProps) {
    // check if product exist
    const product = new ProductAggregate();
    const productCreated = product.createProduct({
      name: props.name,
    });
    // publish event

    return productCreated;
  }
}
