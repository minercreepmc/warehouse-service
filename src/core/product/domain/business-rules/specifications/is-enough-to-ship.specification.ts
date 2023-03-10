import type { ProductEventStorePort } from '@product-gateway/driven-ports';
import type {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { AbstractAsyncSpecification } from 'common-base-classes';

export abstract class ProductQuantitySpecification extends AbstractAsyncSpecification<ProductQuantityValueObject> {}

export class IsEnoughToShipSpecification extends ProductQuantitySpecification {
  constructor(private readonly eventStore: ProductEventStorePort) {
    super();
  }

  async isSatisfiedBy(
    productName: ProductNameValueObject,
    amount: ProductQuantityValueObject,
  ): Promise<boolean> {
    const product = await this.eventStore.getProduct(productName);
    return product.totalQuantity.unpack() >= amount.unpack();
  }
}
