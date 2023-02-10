import { AbstractDomainError } from 'common-base-classes';
import { AdminDomainErrorCode } from './admin.domain-error-code';

export abstract class AdminValidationError extends AbstractDomainError {}
export abstract class AdminBusinessError extends AbstractDomainError {}

export namespace AdminDomainError {
  export class UsernameIsExist extends AdminBusinessError {
    readonly message = 'Usernane is not exist';
    readonly code = AdminDomainErrorCode.usernameIsNotExist;
  }
  export class UsernameIsNotValid extends AdminValidationError {
    readonly message = 'Username is not valid';
    readonly code = AdminDomainErrorCode.usernameIdNotValid;
  }
  export class PasswordIsNotValid extends AdminValidationError {
    readonly message = 'Password is not valid';
    readonly code = AdminDomainErrorCode.passwordIsNotValid;
  }
}
