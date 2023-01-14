import { ProductBusinessChecker } from '@application/common-orchestrators/business-checker';
import { ProductBusinessRules } from '@business-rules/product.business-rules';
import { ProductBusinessError } from '@domain-errors/product';
import { Injectable } from '@nestjs/common';
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
