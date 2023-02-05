import { Injectable } from '@nestjs/common';
import { ProductBusinessRules } from '@product-business-rules';
import { ProductBusinessChecker } from '@product-common/business-checker';
import { ProductBusinessError } from '@product-domain-errors';
import { AbstractNotificationWrapper } from 'common-base-classes';
import { CreateProductDomainData } from './data';

@Injectable()
export class CreateProductBusinessChecker extends AbstractNotificationWrapper<ProductBusinessError> {
  private readonly businessChecker = new ProductBusinessChecker(
    this.businessRules,
    this.note,
  );
  constructor(private readonly businessRules: ProductBusinessRules) {
    super();
  }

  async check(domainData: CreateProductDomainData): Promise<void> {
    await this.businessChecker.checkProductMustNotExist(domainData.name);
  }

  async clearNoteAndCheck(domainData: CreateProductDomainData) {
    super.clearNote();
    return this.check(domainData);
  }
}
