import { ProductValidator } from '@application/common-orchestrators/validators';
import { ProductValidationError } from '@domain-errors/product';
import { AbstractNotificationWrapper } from 'common-base-classes';
import { AddProductThumbnailsCommand } from './data';

export class AddProductThumbnailsValidator extends AbstractNotificationWrapper<ProductValidationError> {
  private readonly validator = new ProductValidator(this.note);

  check(command: AddProductThumbnailsCommand) {
    command.thumbnailPaths.forEach((thumbnail) => {
      this.validator.checkThumbnail(thumbnail);
    });
  }

  clearNoteAndCheck(command: AddProductThumbnailsCommand) {
    super.clearNote();
    this.check(command);
  }
}
