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
    private readonly domainService: ProductDomainService,
    private readonly note: Notification<ProductBusinessError>,
  ) {}

  async checkProductMustExist(productName: ProductNameValueObject) {
    const found = await this.domainService.isProductExist(productName);
    if (!found) {
      this.note.addNote(new ProductDomainError.NameIsNotExist());
    }
  }

  async checkProductMustNotExist(productName: ProductNameValueObject) {
    const found = await this.domainService.isProductExist(productName);
    if (found) {
      this.note.addNote(new ProductDomainError.NameIsExist());
    }
  }

  async checkProductMustEnoughToShip(
    productName: ProductNameValueObject,
    productQuantity: ProductQuantityValueObject,
  ) {
    const isEnough = await this.domainService.isProductEnoughToShip(
      productName,
      productQuantity,
    );
    if (!isEnough) {
      this.note.addNote(new ProductDomainError.QuantityIsNotEnough());
    }
  }
}
