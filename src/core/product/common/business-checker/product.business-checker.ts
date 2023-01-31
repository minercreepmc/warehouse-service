import { ProductBusinessRules } from '@product-business-rules';
import {
  ProductBusinessError,
  ProductDomainError,
} from '@product-domain-errors';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { Notification } from 'common-base-classes';

export class ProductBusinessChecker {
  constructor(
    private readonly businessRules: ProductBusinessRules,
    private readonly note: Notification<ProductBusinessError>,
  ) {}

  productExist = true;

  async checkProductMustExist(productName: ProductNameValueObject) {
    const found = await this.businessRules.isProductNameExist(productName);
    if (!found) {
      this.note.addNote(new ProductDomainError.NameIsNotExist());
      this.productExist = false;
    }
  }

  async checkProductMustNotExist(productName: ProductNameValueObject) {
    const found = await this.businessRules.isProductNameExist(productName);
    if (found) {
      this.note.addNote(new ProductDomainError.NameIsExist());
      this.productExist = true;
    }
  }

  async checkProductMustEnoughToShip(
    productName: ProductNameValueObject,
    productQuantity: ProductQuantityValueObject,
  ) {
    if (!this.productExist) {
      throw new Error('Product not exist');
    }
    const isEnough = await this.businessRules.isEnoughToShip(
      productName,
      productQuantity,
    );
    if (!isEnough) {
      this.note.addNote(new ProductDomainError.QuantityIsNotEnough());
    }
  }
}
