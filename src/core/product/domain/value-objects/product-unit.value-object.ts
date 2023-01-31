import { ArgumentInvalidExeception } from '@tinphamm/common-exceptions';
import { AbstractValueObject } from 'common-base-classes';

enum ProductUnitEnum {
  ton = 'ton',
  kg = 'kg',
  g = 'g',
}

export class ProductUnitValueObject extends AbstractValueObject<string> {
  static create(unit: string) {
    if (!this.isValid(unit)) {
      throw new ArgumentInvalidExeception('Invalid product unit');
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
