import { ProductBusinessChecker } from '@application/common-orchestrators/business-checker';
import { ProductBusinessError } from '@domain-errors/product';
import { ProductDomainService } from '@domain-services/product';
import { Injectable } from '@nestjs/common';
import { AbstractNotificationWrapper } from 'common-base-classes';
import { ImportProductsDomainData } from './data';

@Injectable()
export class ImportProductsBusinessChecker extends AbstractNotificationWrapper<ProductBusinessError> {
  private readonly businessChecker = new ProductBusinessChecker(
    this.domainService,
    this.note,
  );
  constructor(private readonly domainService: ProductDomainService) {
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
