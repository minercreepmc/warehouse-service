import { Injectable } from '@nestjs/common';
import { ProductBusinessRules } from '@product-business-rules';
import { ProductBusinessChecker } from '@product-common/business-checker';
import { ProductBusinessError } from '@product-domain-errors';
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
