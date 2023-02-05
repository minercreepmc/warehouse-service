import { Injectable } from '@nestjs/common';
import { ProductValidator } from '@product-common/validators';
import { ProductValidationError } from '@product-domain-errors';
import { AbstractNotificationWrapper } from 'common-base-classes';
import { CreateProductCommand } from './data';

@Injectable()
export class CreateProductValidator extends AbstractNotificationWrapper<ProductValidationError> {
  private readonly validator = new ProductValidator(this.note);

  check(command: CreateProductCommand): void {
    this.validator.checkName(command.name);
  }

  clearNoteAndCheck(command: CreateProductCommand) {
    super.clearNote();
    return this.check(command);
  }
}
