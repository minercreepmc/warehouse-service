export abstract class ProductInfoValidationException extends Error {}
export abstract class ProductInfoLogicException extends Error {}

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
