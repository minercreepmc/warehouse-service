import type { ProductEventStorePort } from '@product-gateway/driven-ports';
import type { ProductNameValueObject } from '@product-value-object';
import { AbstractAsyncSpecification } from 'common-base-classes';

export abstract class ProductNameSpecification extends AbstractAsyncSpecification<ProductNameValueObject> {}

export class IsProductNameExistSpecification extends ProductNameSpecification {
  constructor(private readonly eventStore: ProductEventStorePort) {
    super();
  }
  async isSatisfiedBy(candidate: ProductNameValueObject): Promise<boolean> {
    const found = await this.eventStore.isProductExist(candidate);
    return Boolean(found);
  }
}
