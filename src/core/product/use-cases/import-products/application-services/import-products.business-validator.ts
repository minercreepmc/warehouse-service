import { ValidationResponse } from '@common-interfaces';
import { Injectable } from '@nestjs/common';
import {
  ProductBusinessException,
  ProductDomainException,
} from '@product-domain-exceptions';
import { ProductDomainService } from '@product-domain-services';
import { ProductNameValueObject } from '@product-value-object';
import { ImportProductsDomainData } from './dtos';

@Injectable()
export class ImportProductsBusinessValidator {
  constructor(private readonly productDomainService: ProductDomainService) {}
  exceptions: ProductBusinessException[] = [];

  async validate(
    domainData: ImportProductsDomainData,
  ): Promise<ValidationResponse> {
    const { name } = domainData;
    this.clearExceptions();
    await this.checkProductMustExist(name);
    return this.getValdiationResponse(this.exceptions);
  }

  clearExceptions(): void {
    this.exceptions = [];
  }

  async checkProductMustExist(name: ProductNameValueObject): Promise<void> {
    const productExist = await this.productDomainService.isProductExist(name);
    if (!productExist) {
      this.exceptions.push(new ProductDomainException.NameIsNotExist());
    }
  }

  getValdiationResponse(
    exceptions: ProductBusinessException[],
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
