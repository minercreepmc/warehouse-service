import { ValidationResponse } from '@common-interfaces';
import { Injectable } from '@nestjs/common';
import { ProductValidationException } from '@product-domain-exceptions';
import { ProductNameValueObject } from '@product-value-object';
import { CreateProductCommand } from './dtos';

@Injectable()
export class CreateProductCommandValidator {
  exceptions: ProductValidationException[] = [];
  validate(command: CreateProductCommand): ValidationResponse {
    const { name } = command;
    this.exceptions = [];
    this.checkName(name);
    return this.getValidationResponse(this.exceptions);
  }

  checkName(name: string) {
    const nameValidationResponse = ProductNameValueObject.validate(name);
    if (!nameValidationResponse.isValid) {
      this.exceptions.push(...nameValidationResponse.exceptions);
    }
  }

  getValidationResponse(
    exceptions: ProductValidationException[],
  ): ValidationResponse {
    if (exceptions.length > 0) {
      return {
        exceptions,
        isValid: false,
      };
    } else {
      return {
        exceptions: [],
        isValid: true,
      };
    }
  }
}
