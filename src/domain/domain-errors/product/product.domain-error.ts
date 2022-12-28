import { AbstractDomainError } from 'common-base-classes';
import { ProductDomainErrorCode } from './product.domain-error-code';

export abstract class ProductValidationError extends AbstractDomainError {}
export abstract class ProductBusinessError extends AbstractDomainError {}

export namespace ProductDomainError {
  export class NameIsNotValid extends ProductValidationError {
    readonly code = ProductDomainErrorCode.nameIsNotValid;
    readonly message = 'Product name is not valid';
  }
  export class QuantityIsNotValid extends ProductValidationError {
    readonly code = ProductDomainErrorCode.quantityIsNotValid;
    readonly message = 'Product quantity is not valid';
  }
  export class UnitIsNotValid extends ProductValidationError {
    readonly code = ProductDomainErrorCode.unitIsNotValid;
    readonly message = 'Product unit is not valid';
  }
  export class NameIsExist extends ProductBusinessError {
    readonly code = ProductDomainErrorCode.nameIsExist;
    readonly message = 'Product name is exist';
  }
  export class NameIsNotExist extends ProductBusinessError {
    readonly code = ProductDomainErrorCode.nameIsNotExist;
    readonly message = 'Product name is not exist';
  }
}
