import { Injectable } from '@nestjs/common';
import { ProductValidator } from '@product-common/validators';
import { ProductValidationError } from '@product-domain-errors';
import { AbstractNotificationWrapper } from 'common-base-classes';
import { ImportProductsCommand } from './data';

@Injectable()
export class ImportProductsValidator extends AbstractNotificationWrapper<ProductValidationError> {
  private readonly validator = new ProductValidator(this.note);
  check(command: ImportProductsCommand): void {
    this.validator.checkName(command.name);
    this.validator.checkQuantity(command.quantity);
  }

  clearNoteAndCheck(command: ImportProductsCommand): void {
    super.clearNote();
    this.check(command);
  }
}
