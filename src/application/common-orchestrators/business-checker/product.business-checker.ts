import { ProductBusinessRules } from '@business-rules/product.business-rules';
import {
  ProductBusinessError,
  ProductDomainError,
} from '@domain-errors/product';
import { ProductDomainService } from '@domain-services/product';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@value-objects/product';
import { Notification } from 'common-base-classes';

export class ProductBusinessChecker {
  constructor(
    private readonly businessRules: ProductBusinessRules,
    private readonly note: Notification<ProductBusinessError>,
  ) {}

  async checkProductMustExist(productName: ProductNameValueObject) {
    const found = await this.businessRules.isProductNameExist(productName);
    if (!found) {
      this.note.addNote(new ProductDomainError.NameIsNotExist());
    }
  }

  async checkProductMustNotExist(productName: ProductNameValueObject) {
    const found = await this.businessRules.isProductNameExist(productName);
    if (found) {
      this.note.addNote(new ProductDomainError.NameIsExist());
    }
  }

  async checkProductMustEnoughToShip(
    productName: ProductNameValueObject,
    productQuantity: ProductQuantityValueObject,
  ) {
    const isEnough = await this.businessRules.isEnoughToShip(
      productName,
      productQuantity,
    );
    if (!isEnough) {
      this.note.addNote(new ProductDomainError.QuantityIsNotEnough());
    }
  }
}
