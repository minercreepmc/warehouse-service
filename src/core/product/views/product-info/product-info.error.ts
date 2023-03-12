import { AbstractDomainException } from 'common-base-classes';

export abstract class ProductInfoValidationException extends AbstractDomainException {}
export abstract class ProductInfoLogicException extends AbstractDomainException {}

export enum ProductInfoExceptionCode {
  nameIsNotValid = 'PRODUCT_INFO.NAME.IS_NOT_VALID',
  nameIsNotExist = 'PRODUCT_INFO.NAME.IS_NOT_EXIST',
}

export namespace ProductInfoException {
  export class NameIsNotValid extends ProductInfoValidationException {
    readonly message = 'Product info name is not valid';
    readonly code = ProductInfoExceptionCode.nameIsNotValid;
  }
  export class NameIsNotExist extends ProductInfoLogicException {
    readonly message = 'Product info name is not exist';
    readonly code = ProductInfoExceptionCode.nameIsNotExist;
  }
}
