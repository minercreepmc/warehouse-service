import {
  ProductDomainException,
  ProductValidationException,
} from '@product-domain-exceptions';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
  ProductThumbnailPathValueObject,
  ProductUnitValueObject,
} from '@product-value-object';
import { Notification } from 'common-base-classes';
import { ArgumentInvalidException } from 'ts-common-exceptions';

export class ProductValidator {
  constructor(
    private readonly note: Notification<ProductValidationException>,
  ) {}

  get errors() {
    if (!this.note.hasNote()) {
      throw new ArgumentInvalidException('Cannot get exception of valid data');
    }
    return this.note.getNotes();
  }

  isValid() {
    return !this.note.hasNote();
  }

  checkName(name: string) {
    if (!ProductNameValueObject.isValid(name)) {
      this.note.addNote(new ProductDomainException.NameIsNotValid());
    }
  }

  checkQuantity(quantity: number) {
    if (!ProductQuantityValueObject.isValid(quantity)) {
      this.note.addNote(new ProductDomainException.QuantityIsNotValid());
    }
  }

  checkUnit(unit: string) {
    if (!ProductUnitValueObject.isValid(unit)) {
      this.note.addNote(new ProductDomainException.UnitIsNotValid());
    }
  }

  checkThumbnail(path: string) {
    if (!ProductThumbnailPathValueObject.isValid(path)) {
      this.note.addNote(new ProductDomainException.ThumbnailIsNotValid());
    }
  }
}
