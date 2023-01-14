import { ProductEventStorePort } from '@gateway/driven-ports/product';
import { ProductNameValueObject } from '@value-objects/product';
import { AbstractAsyncSpecification } from 'common-base-classes';

export abstract class ProductNameSpecification extends AbstractAsyncSpecification<ProductNameValueObject> {}

export class IsProductNameExistSpecification extends ProductNameSpecification {
  constructor(private readonly eventStore: ProductEventStorePort) {
    super();
  }
  async isSatisfiedBy(candidate: ProductNameValueObject): Promise<boolean> {
    const found = await this.eventStore.getProduct(candidate);
    return Boolean(found);
  }
}
