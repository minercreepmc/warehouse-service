import { ProductBusinessChecker } from '@application/common-orchestrators/business-checker';
import { ProductBusinessError } from '@domain-errors/product';
import { ProductDomainService } from '@domain-services/product';
import { Injectable } from '@nestjs/common';
import { AbstractNotificationWrapper } from 'common-base-classes';
import { GetQualityOnHandDomainData } from './data';

@Injectable()
export class GetQualityOnHandBusinessChecker extends AbstractNotificationWrapper<ProductBusinessError> {
  private readonly businessChecker = new ProductBusinessChecker(
    this.domainService,
    this.note,
  );

  constructor(private readonly domainService: ProductDomainService) {
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
