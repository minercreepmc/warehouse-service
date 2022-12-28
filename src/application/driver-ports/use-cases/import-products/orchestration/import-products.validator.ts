import { ProductValidationError } from '@domain-errors/product';
import { Injectable } from '@nestjs/common';
import { AbstractNotificationWrapper } from 'common-base-classes';
import { ProductValidator } from 'src/application/validators/product.validator';
import { ImportProductsCommand } from './data';

@Injectable()
export class ImportProductsValidator extends AbstractNotificationWrapper<ProductValidationError> {
  private readonly validator = new ProductValidator(this.note);
  check(command: ImportProductsCommand): void {
    this.validator.checkName(command.name);
    this.validator.checkQuantity(command.quantity);
    this.validator.checkUnit(command.unit);
  }

  clearNoteAndCheck(command: ImportProductsCommand): void {
    super.clearNote();
    this.check(command);
  }
}
