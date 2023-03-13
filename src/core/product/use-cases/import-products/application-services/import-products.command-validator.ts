import { ValidationResponse } from '@common-interfaces';
import { Injectable } from '@nestjs/common';
import { ProductValidationException } from '@product-domain-exceptions';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { ImportProductsCommand } from './dtos';

@Injectable()
export class ImportProductsCommandValidator {
  exceptions: ProductValidationException[] = [];
  validate(command: ImportProductsCommand): ValidationResponse {
    const { name, quantity } = command;
    this.cleanExceptions();
    this.checkName(name);
    this.checkQuantity(quantity);
    return this.getValidationResponse(this.exceptions);
  }

  cleanExceptions(): void {
    this.exceptions = [];
  }

  checkName(name: string): void {
    const res = ProductNameValueObject.validate(name);
    if (!res.isValid) {
      this.exceptions.push(...res.exceptions);
    }
  }

  checkQuantity(quantity: number): void {
    const res = ProductQuantityValueObject.validate(quantity);
    if (!res.isValid) {
      this.exceptions.push(...res.exceptions);
    }
  }

  getValidationResponse(
    exceptions: ProductValidationException[],
  ): ValidationResponse {
    if (exceptions.length > 0) {
      return {
        isValid: false,
        exceptions,
      };
    }
    return {
      isValid: true,
      exceptions: [],
    };
  }
}
