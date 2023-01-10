import {
  ProductDomainError,
  ProductValidationError,
} from '@domain-errors/product';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
  ProductThumbnailPathValueObject,
  ProductUnitValueObject,
} from '@value-objects/product';
import { Notification } from 'common-base-classes';

export class ProductValidator {
  constructor(private readonly note: Notification<ProductValidationError>) {}

  get errors() {
    if (!this.note.hasNote()) {
      throw new Error('Cannot get error of valid data');
    }
    return this.note.getNotes();
  }

  isValid() {
    return !this.note.hasNote();
  }

  checkName(name: string) {
    if (!ProductNameValueObject.isValid(name)) {
      this.note.addNote(new ProductDomainError.NameIsNotValid());
    }
  }

  checkQuantity(quantity: number) {
    if (!ProductQuantityValueObject.isValid(quantity)) {
      this.note.addNote(new ProductDomainError.QuantityIsNotValid());
    }
  }

  checkUnit(unit: string) {
    if (!ProductUnitValueObject.isValid(unit)) {
      this.note.addNote(new ProductDomainError.UnitIsNotValid());
    }
  }

  checkThumbnail(path: string) {
    if (!ProductThumbnailPathValueObject.isValid(path)) {
      this.note.addNote(new ProductDomainError.ThumbnailIsNotValid());
    }
  }
}
