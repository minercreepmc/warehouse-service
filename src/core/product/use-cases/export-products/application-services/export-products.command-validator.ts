import { ValidationResponse } from '@common-interfaces';
import { Injectable } from '@nestjs/common';
import { ProductValidationException } from '@product-domain-exceptions';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { ExportProductsCommand } from './dtos';

@Injectable()
export class ExportProductsCommandValidator {
  exceptions: ProductValidationException[] = [];

  validate(command: ExportProductsCommand): ValidationResponse {
    const { name, quantity } = command;
    this.checkName(name);
    this.checkQuantity(quantity);
    return this.getValidationResponse(this.exceptions);
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
