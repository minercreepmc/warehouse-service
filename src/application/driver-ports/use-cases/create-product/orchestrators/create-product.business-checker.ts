import { ProductBusinessChecker } from '@application/common-orchestrators/business-checker';
import { ProductBusinessError } from '@domain-errors/product';
import { ProductDomainService } from '@domain-services/product';
import { Injectable } from '@nestjs/common';
import { AbstractNotificationWrapper } from 'common-base-classes';
import { CreateProductDomainData } from './data';

@Injectable()
export class CreateProductBusinessChecker extends AbstractNotificationWrapper<ProductBusinessError> {
  private readonly businessChecker = new ProductBusinessChecker(
    this.productDomainService,
    this.note,
  );
  constructor(private readonly productDomainService: ProductDomainService) {
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
