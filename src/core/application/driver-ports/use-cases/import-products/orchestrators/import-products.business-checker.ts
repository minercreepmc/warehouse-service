import { ProductBusinessChecker } from '@application/common/business-checker';
import { ProductBusinessRules } from '@business-rules/product.business-rules';
import { ProductBusinessError } from '@domain-errors/product';
import { Injectable } from '@nestjs/common';
import { AbstractNotificationWrapper } from 'common-base-classes';
import { ImportProductsDomainData } from './data';

@Injectable()
export class ImportProductsBusinessChecker extends AbstractNotificationWrapper<ProductBusinessError> {
  private readonly businessChecker = new ProductBusinessChecker(
    this.businessRules,
    this.note,
  );
  constructor(private readonly businessRules: ProductBusinessRules) {
    super();
  }

  async check(domainData: ImportProductsDomainData): Promise<void> {
    return this.businessChecker.checkProductMustExist(domainData.name);
  }

  async clearNoteAndCheck(domainData: ImportProductsDomainData): Promise<void> {
    super.clearNote();
    return this.check(domainData);
  }
}
