import { AbstractDomainError } from 'common-base-classes';

export abstract class ProductInfoValidationError extends AbstractDomainError {}
export abstract class ProductInfoLogicError extends AbstractDomainError {}

export enum ProductInfoErrorCode {
  nameIsNotValid = 'PRODUCT_INFO.NAME.IS_NOT_VALID',
  nameIsNotExist = 'PRODUCT_INFO.NAME.IS_NOT_EXIST',
}

export namespace ProductInfoError {
  export class NameIsNotValid extends ProductInfoValidationError {
    readonly message = 'Product info name is not valid';
    readonly code = ProductInfoErrorCode.nameIsNotValid;
  }
  export class NameIsNotExist extends ProductInfoLogicError {
    readonly message = 'Product info name is not exist';
    readonly code = ProductInfoErrorCode.nameIsNotExist;
  }
}
