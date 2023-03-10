import {
  TextValueObject,
  TextValueObjectOptions,
} from '@common-value-object/primitive/text';

export class ProductNameValueObject extends TextValueObject {
  static readonly OPTIONS: TextValueObjectOptions = {
    minLength: 2,
    maxLength: 50,
    allowSymbols: true,
    allowWhitespace: true,
    allowUppercase: true,
    allowLowercase: true,
    allowNumber: true,
    allowEmpty: false,
  };
  constructor(value: string) {
    super(value, ProductNameValueObject.OPTIONS);
  }
}
