import { AbstractDomainError } from 'common-base-classes';
import { ProductDomainErrorCode } from './product.domain-error-code';

export abstract class ProductValidationError extends AbstractDomainError {}
export abstract class ProductBusinessError extends AbstractDomainError {}

export namespace ProductDomainError {
  export class NameIsNotValid extends ProductValidationError {
    readonly code = ProductDomainErrorCode.nameIsNotValid;
    readonly message = 'Product name is not valid';
  }
  export class NameExist extends ProductBusinessError {
    readonly code = ProductDomainErrorCode.nameIsExist;
    readonly message = 'Product name is exist';
  }
}
