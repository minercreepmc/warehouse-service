import { ProductValidator } from '@application/common-orchestrators/validators';
import { ProductValidationError } from '@domain-errors/product';
import { Injectable } from '@nestjs/common';
import { AbstractNotificationWrapper } from 'common-base-classes';
import { GetQualityOnHandQuery } from './data';

@Injectable()
export class GetQualityOnHandValidator extends AbstractNotificationWrapper<ProductValidationError> {
  private readonly validator = new ProductValidator(this.note);
  check(query: GetQualityOnHandQuery): void {
    this.validator.checkName(query.name);
  }

  clearNoteAndCheck(query: GetQualityOnHandQuery) {
    super.clearNote();
    return this.check(query);
  }
}
