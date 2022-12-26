import {
  ProductDomainError,
  ProductValidationError,
} from '@domain-errors/product/product.domain-error';
import { Injectable } from '@nestjs/common';
import { ProductNameValueObject } from '@value-objects/product';
import { Notification } from 'common-base-classes';
import { CreateProductCommand } from './data';

export interface CreateProductValidatorPort {
  isValid(command: CreateProductCommand): boolean;
  get errors(): ProductValidationError[];
}

export const createProductValidatorDiToken = Symbol('CREATE_PRODUCT_VALIDATOR');

@Injectable()
export class CreateProductValidator implements CreateProductValidatorPort {
  private readonly note = new Notification<ProductValidationError>();

  isValid(command: CreateProductCommand) {
    const isValidName = ProductNameValueObject.isValid(command.name);

    if (!isValidName) {
      this.note.addNote(new ProductDomainError.NameIsNotValid());
    }

    return !this.note.hasNote();
  }

  get errors(): ProductValidationError[] {
    if (!this.note.hasNote()) {
      throw new Error(`Command didn't have any errors`);
    }
    return this.note.getNotes();
  }
}
