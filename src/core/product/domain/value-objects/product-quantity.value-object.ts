import {
  NumericValueObject,
  NumericValueObjectOptions,
} from '@common-value-object/primitive/numeric';

export class ProductQuantityValueObject extends NumericValueObject<ProductQuantityValueObject> {
  static readonly OPTIONS: NumericValueObjectOptions = {
    containsNegative: false,
    containsPositive: true,
    containsZero: true,
    containsInteger: true,
    containsFloat: true,
    minValue: 0,
    maxValue: Number.MAX_SAFE_INTEGER,
  };

  constructor(value: number) {
    super(value, ProductQuantityValueObject.OPTIONS);
  }
}
