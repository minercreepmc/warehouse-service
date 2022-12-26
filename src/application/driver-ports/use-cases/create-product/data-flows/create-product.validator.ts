import { ProductValidationError } from '@domain-errors/product/product.domain-error';
import { ProductNameValueObject } from '@value-objects/product';
import { CreateProductCommand } from './create-product.command';

export interface CreateProductValidatorPort {
  isValid(command: CreateProductCommand): boolean;
  errors(): ProductValidationError;
}

export class CreateProductValidator {
  isValid(command: CreateProductCommand) {
    const isValidName = ProductNameValueObject.isValid(command.name);

    return isValidName;
  }
}
