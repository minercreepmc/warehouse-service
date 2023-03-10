import { ProductAggregate } from '@product-aggregate';
import { ProductDomainError } from '@product-domain-errors';
import { ProductEventStorePort } from '@product-gateway/driven-ports';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';

export interface isEnoughToExportOptions {
  productName: ProductNameValueObject;
  amount: ProductQuantityValueObject;
}

export class ProductInventoryDomainService {
  constructor(private readonly eventStore: ProductEventStorePort) {}
  async isProductExist(name: ProductNameValueObject) {
    return this.eventStore.isProductExist(name);
  }

  async isEnoughToExport(options: isEnoughToExportOptions) {
    const { productName, amount } = options;
    const product = await this.eventStore.getProduct(productName);
    return product.totalQuantity.isGreaterThanOrEqualTo(amount);
  }

  async getProduct(
    productName: ProductNameValueObject,
  ): Promise<ProductAggregate> {
    const found = this.eventStore.isProductExist(productName);
    if (!found) {
      throw new ProductDomainError.NameIsNotExist();
    }

    return this.eventStore.getProduct(productName);
  }
}
