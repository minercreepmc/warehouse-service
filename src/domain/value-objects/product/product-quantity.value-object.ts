import { ArgumentInvalidExeception } from '@tinphamm/common-exceptions';
import { AbstractValueObject } from 'common-base-classes';

export class ProductQuantityValueObject extends AbstractValueObject<number> {
  private static readonly MIN_QUANTITY = 0;

  static create(value = 0) {
    if (!this.isValid(value)) {
      throw new ArgumentInvalidExeception('Invalid quantity number');
    }

    return new ProductQuantityValueObject(value);
  }

  static isValid(value: number) {
    return value >= this.MIN_QUANTITY;
  }

  private constructor(value: number) {
    super({ value });
  }
}
