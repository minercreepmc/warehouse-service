import { AbstractValueObject } from 'common-base-classes';
import { ArgumentInvalidException } from 'ts-common-exceptions';

enum ProductUnitEnum {
  ton = 'ton',
  kg = 'kg',
  g = 'g',
}

export class ProductUnitValueObject extends AbstractValueObject<string> {
  static create(unit: string) {
    if (!this.isValid(unit)) {
      throw new ArgumentInvalidException('Invalid product unit');
    }
    return new ProductUnitValueObject(unit);
  }

  static isValid(candidate: string) {
    return candidate in ProductUnitEnum;
  }

  constructor(value: string) {
    super({ value });
  }
}
