import {
  AdminPasswordValueObject,
  AdminUsernameValueObject,
} from '@admin-value-object';
import { AdminDomainError, AdminValidationError } from '@product-domain-errors';
import { AbstractNotificationWrapper } from 'common-base-classes';
import { CreateAdminCommand } from './data';

export class CreateAdminValidator extends AbstractNotificationWrapper<AdminValidationError> {
  validate(command: CreateAdminCommand) {
    this.clearNote();
    this._validate(command);
  }

  private _validate(command: CreateAdminCommand) {
    const { username, password } = command;
    this.validateUsername(username);
    this.validatePassword(password);
  }

  private validateUsername(candidate: string) {
    if (!AdminUsernameValueObject.isValid(candidate)) {
      this.note.addNote(new AdminDomainError.UsernameIsNotValid());
    }
  }

  private validatePassword(candidate: string) {
    if (!AdminPasswordValueObject.isValid(candidate)) {
      this.note.addNote(new AdminDomainError.PasswordIsNotValid());
    }
  }
}
