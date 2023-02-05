import { Injectable } from '@nestjs/common';
import { ProductBusinessRules } from '@product-business-rules';
import { ProductBusinessChecker } from '@product-common/business-checker';
import { ProductBusinessError } from '@product-domain-errors';
import { AbstractNotificationWrapper } from 'common-base-classes';
import { ShipProductsDomainData } from './data/ship-products.domain-data';

@Injectable()
export class ShipProductsBusinessChecker extends AbstractNotificationWrapper<ProductBusinessError> {
  constructor(private readonly businessRules: ProductBusinessRules) {
    super();
  }

  private readonly businessChecker = new ProductBusinessChecker(
    this.businessRules,
    this.note,
  );
  async check(domainData: ShipProductsDomainData) {
    await this.businessChecker.checkProductMustExist(domainData.name);
    if (!this.businessChecker.productExist) {
      return;
    }
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
