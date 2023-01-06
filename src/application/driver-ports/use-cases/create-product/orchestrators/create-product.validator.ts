import { ProductValidator } from '@application/common-orchestrators/validators';
import { ProductValidationError } from '@domain-errors/product/product.domain-error';
import { Injectable } from '@nestjs/common';
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
