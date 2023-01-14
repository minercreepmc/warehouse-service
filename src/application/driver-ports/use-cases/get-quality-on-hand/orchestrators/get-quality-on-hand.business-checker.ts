import { ProductBusinessChecker } from '@application/common-orchestrators/business-checker';
import { ProductBusinessRules } from '@business-rules/product.business-rules';
import { ProductBusinessError } from '@domain-errors/product';
import { Injectable } from '@nestjs/common';
import { AbstractNotificationWrapper } from 'common-base-classes';
import { GetQualityOnHandDomainData } from './data';

@Injectable()
export class GetQualityOnHandBusinessChecker extends AbstractNotificationWrapper<ProductBusinessError> {
  private readonly businessChecker = new ProductBusinessChecker(
    this.businessRules,
    this.note,
  );

  constructor(private readonly businessRules: ProductBusinessRules) {
    super();
  }
  async check(domainData: GetQualityOnHandDomainData): Promise<void> {
    await this.businessChecker.checkProductMustExist(domainData.name);
  }

  async clearNoteAndCheck(domainData: GetQualityOnHandDomainData) {
    super.clearNote();
    return this.check(domainData);
  }
}
