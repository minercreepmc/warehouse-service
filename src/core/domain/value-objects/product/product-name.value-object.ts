import {
  AbstractValueObject,
  isStringBetweenLength,
} from 'common-base-classes';
import { ArgumentInvalidExeception } from '@tinphamm/common-exceptions';

export class ProductNameValueObject extends AbstractValueObject<string> {
  private static readonly MIN_LENGTH = 1;
  private static readonly MAX_LENGTH = 50;

  static create(name: string) {
    if (!this.isValid(name)) {
      throw new ArgumentInvalidExeception('Invalid product name');
    }

    return new ProductNameValueObject(name);
  }

  static isValid(name: string) {
    return isStringBetweenLength(name, this.MIN_LENGTH, this.MAX_LENGTH);
  }

  private constructor(value: string) {
    super({ value });
  }
}
