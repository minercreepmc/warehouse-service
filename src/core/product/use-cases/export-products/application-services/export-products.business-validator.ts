import { ValidationResponse } from '@common-interfaces';
import { Injectable } from '@nestjs/common';
import {
  ProductBusinessException,
  ProductDomainException,
} from '@product-domain-exceptions';
import { ProductDomainService } from '@product-domain-services';
import { isEnoughToExportOptions } from '@product-domain-services/services';
import { ProductNameValueObject } from '@product-value-object';
import { ExportProductsDomainData } from './dtos';

@Injectable()
export class ExportProductsBusinessValidator {
  constructor(private readonly productDomainService: ProductDomainService) {}

  exceptions: ProductBusinessException[] = [];
  productExist = true;
  async validate(
    domainData: ExportProductsDomainData,
  ): Promise<ValidationResponse> {
    const { quantity, name } = domainData;
    this.clearExceptions();
    await this.checkProductMustExist(name);
    if (!this.productExist) {
      return this.getValidationResponse(this.exceptions);
    }
    await this.checkProductMustEnoughToExport({
      amount: quantity,
      productName: name,
    });
    return this.getValidationResponse(this.exceptions);
  }

  clearExceptions(): void {
    this.exceptions = [];
  }

  getValidationResponse(
    exceptions: ProductBusinessException[],
  ): ValidationResponse {
    if (exceptions.length > 0) {
      return {
        isValid: false,
        exceptions,
      };
    } else {
      return {
        isValid: true,
        exceptions: [],
      };
    }
  }

  async checkProductMustExist(name: ProductNameValueObject): Promise<void> {
    const productExist = await this.productDomainService.isProductExist(name);
    if (!productExist) {
      this.exceptions.push(new ProductDomainException.NameIsNotExist());
      this.productExist = true;
    }
  }

  async checkProductMustEnoughToExport(
    options: isEnoughToExportOptions,
  ): Promise<void> {
    const enough = await this.productDomainService.isEnoughToExport(options);
    if (!enough) {
      this.exceptions.push(new ProductDomainException.QuantityIsNotEnough());
    }
  }
}
