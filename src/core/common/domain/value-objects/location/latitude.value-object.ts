import { AbstractValueObject } from 'common-base-classes';
import { ArgumentInvalidException } from 'ts-common-exceptions';

export class LatitudeValueObject extends AbstractValueObject<number> {
  static isValidFormat(candidate: unknown) {
    if (typeof candidate !== 'number') return false;
    if (Number.isNaN(candidate)) return false;
    if (candidate < -90 || candidate > 90) return false;
    return true;
  }

  constructor(value: number) {
    if (!LatitudeValueObject.isValidFormat(value)) {
      throw new ArgumentInvalidException('Invalid latitude value');
    }
    super({ value });
  }
}
