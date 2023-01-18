import { ProductValidator } from '@application/common/validators';
import { ProductValidationError } from '@domain-errors/product';
import { Injectable } from '@nestjs/common';
import { AbstractNotificationWrapper } from 'common-base-classes';
import { ShipProductsCommand } from './data';

@Injectable()
export class ShipProductsValidator extends AbstractNotificationWrapper<ProductValidationError> {
  private readonly validator = new ProductValidator(this.note);

  check(command: ShipProductsCommand): void {
    this.validator.checkName(command.name);
    this.validator.checkQuantity(command.quantity);
  }

  clearNoteAndCheck(command: ShipProductsCommand): void {
    super.clearNote();
    this.check(command);
  }
}
