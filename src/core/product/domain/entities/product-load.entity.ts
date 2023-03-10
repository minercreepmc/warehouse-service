import { ProductQuantityValueObject } from '@product-value-object';
import { AbstractEntity, ID } from 'common-base-classes';

export interface ProductLoadEntityDetails {
  productQuantity: ProductQuantityValueObject;
  productId: ID;
}

export interface ProductLoadOptions {
  productLoadBarcode: ID;
  productQuantity: ProductQuantityValueObject;
  productId: ID;
}

export class ProductLoadEntity extends AbstractEntity<ProductLoadEntityDetails> {
  constructor(options: ProductLoadOptions) {
    const { productLoadBarcode, productQuantity, productId } = options;
    const details: ProductLoadEntityDetails = {
      productId,
      productQuantity,
    };
    super({ id: productLoadBarcode, details });
  }

  exportAmountAndReturnLeftOver(
    amount: ProductQuantityValueObject,
  ): ProductQuantityValueObject {
    if (!this.isEnoughToExport(amount)) {
      const leftOver = amount.subtract(this.quantity);
      this.exportEntireQuantity();
      return leftOver;
    }

    this.quantity = this.quantity.subtract(amount);
    return new ProductQuantityValueObject(0);
  }

  isEnoughToExport(need: ProductQuantityValueObject) {
    return this.quantity.isGreaterThanOrEqualTo(need);
  }

  exportEntireQuantity() {
    this.quantity = this.quantity.subtract(this.quantity);
  }

  get quantity(): ProductQuantityValueObject {
    return this.details.productQuantity;
  }

  set quantity(newQuantity: ProductQuantityValueObject) {
    this.details.productQuantity = newQuantity;
  }
}
