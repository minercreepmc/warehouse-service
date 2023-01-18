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

  add(payload: ProductQuantityValueObject): ProductQuantityValueObject {
    return ProductQuantityValueObject.create(this.unpack() + payload.unpack());
  }

  remove(payload: ProductQuantityValueObject): ProductQuantityValueObject {
    if (this.unpack() - payload.unpack() < 0) {
      throw new ArgumentInvalidExeception('Invalid quantity to remove');
    }
    return ProductQuantityValueObject.create(this.unpack() - payload.unpack());
  }

  static isValid(value: number) {
    return value >= this.MIN_QUANTITY;
  }

  private constructor(value: number) {
    super({ value });
  }
}
