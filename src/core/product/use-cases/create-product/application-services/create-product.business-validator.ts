import { ValidationResponse } from '@common-interfaces';
import { Injectable } from '@nestjs/common';
import {
  ProductBusinessException,
  ProductDomainException,
} from '@product-domain-exceptions';
import { ProductDomainService } from '@product-domain-services';
import { ProductNameValueObject } from '@product-value-object';
import { CreateProductDomainData } from './dtos';

@Injectable()
export class CreateProductBusinessValidator {
  constructor(private readonly productDomainService: ProductDomainService) {}
  exceptions: ProductBusinessException[] = [];

  async validate(
    domainData: CreateProductDomainData,
  ): Promise<ValidationResponse> {
    const { name } = domainData;
    this.exceptions = [];
    await this.checkProductMustNotExist(name);
    return this.getValidationResponse(this.exceptions);
  }

  async checkProductMustNotExist(name: ProductNameValueObject) {
    const productExist = await this.productDomainService.isProductExist(name);
    if (productExist) {
      this.exceptions.push(new ProductDomainException.NameIsExist());
    }
  }

  getValidationResponse(
    exceptions: ProductBusinessException[],
  ): ValidationResponse {
    if (exceptions.length > 0) {
      return {
        exceptions,
        isValid: false,
      };
    }
    return {
      exceptions: [],
      isValid: true,
    };
  }
}
