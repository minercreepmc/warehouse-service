import { ProductDomainExceptionCode } from './product.domain-exception-code';

export abstract class ProductValidationException extends Error {}
export abstract class ProductBusinessException extends Error {}

export namespace ProductDomainException {
  export class NameIsNotValid extends ProductValidationException {
    readonly code = ProductDomainExceptionCode.nameIsNotValid;
    readonly message = 'Product name is not valid';
  }
  export class QuantityIsNotValid extends ProductValidationException {
    readonly code = ProductDomainExceptionCode.quantityIsNotValid;
    readonly message = 'Product quantity is not valid';
  }
  export class QuantityIsNotEnough extends ProductBusinessException {
    readonly code = ProductDomainExceptionCode.quantityIsNotEnough;
    readonly message = 'Product quantity is not enough to export';
  }
  export class UnitIsNotValid extends ProductValidationException {
    readonly code = ProductDomainExceptionCode.unitIsNotValid;
    readonly message = 'Product unit is not valid';
  }
  export class NameIsExist extends ProductBusinessException {
    readonly code = ProductDomainExceptionCode.nameIsExist;
    readonly message = 'Product name is exist';
  }
  export class NameIsNotExist extends ProductBusinessException {
    readonly code = ProductDomainExceptionCode.nameIsNotExist;
    readonly message = 'Product name is not exist';
  }

  export class ThumbnailIsNotValid extends ProductValidationException {
    readonly code = ProductDomainExceptionCode.thumbnailIsNotValid;
    readonly message = 'Product thumbnail is not valid';
  }
}
