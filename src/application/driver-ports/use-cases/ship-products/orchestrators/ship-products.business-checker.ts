import { ProductBusinessChecker } from '@application/common-orchestrators/business-checker';
import { ProductBusinessError } from '@domain-errors/product';
import { ProductDomainService } from '@domain-services/product';
import { Injectable } from '@nestjs/common';
import { AbstractNotificationWrapper } from 'common-base-classes';
import { ShipProductsDomainData } from './data/ship-products.domain-data';

@Injectable()
export class ShipProductsBusinessChecker extends AbstractNotificationWrapper<ProductBusinessError> {
  constructor(private readonly domainService: ProductDomainService) {
    super();
  }

  private readonly businessChecker = new ProductBusinessChecker(
    this.domainService,
    this.note,
  );
  async check(domainData: ShipProductsDomainData) {
    await this.businessChecker.checkProductMustExist(domainData.name);
    await this.businessChecker.checkProductMustEnoughToShip(
      domainData.name,
      domainData.quantity,
    );
  }

  async clearNoteAndCheck(domainData: ShipProductsDomainData) {
    super.clearNote();
    return this.check(domainData);
  }
}
