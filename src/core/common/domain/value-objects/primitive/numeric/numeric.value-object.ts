import { AbstractValueObject } from 'common-base-classes';
import { ArgumentInvalidException } from 'ts-common-exceptions';
import {
  IsAllowedSignOptions,
  IsAllowedZeroOptions,
  NumericValueObjectOptions,
} from './numeric.interface';

export class NumericValueObject extends AbstractValueObject<number> {
  constructor(value: number, options = NumericValueObject.DEFAULT_OPTIONS) {
    if (typeof value !== 'number') {
      throw new ArgumentInvalidException('Invalid number value');
    }
    if (options && !NumericValueObject.isValidOptions(options)) {
      throw new ArgumentInvalidException('Options is not valid');
    }

    if (!NumericValueObject.isValidValue(value, options)) {
      throw new ArgumentInvalidException('Invalid number value');
    }

    super({ value });
    this.options = options;
  }

  private readonly options: NumericValueObjectOptions;

  getOptions(): NumericValueObjectOptions {
    return this.options;
  }

  static readonly DEFAULT_OPTIONS: NumericValueObjectOptions = {
    containsNegative: true,
    containsPositive: true,
    containsZero: true,
    containsInteger: true,
    containsFloat: true,
    minValue: Number.MIN_SAFE_INTEGER,
    maxValue: Number.MAX_SAFE_INTEGER,
  };

  static isValidValue(
    candidate: unknown,
    options = NumericValueObject.DEFAULT_OPTIONS,
  ): boolean {
    if (typeof candidate !== 'number') {
      return false;
    }

    const {
      minValue,
      maxValue,
      containsZero,
      containsPositive,
      containsNegative,
      containsInteger,
      containsFloat,
    } = options;

    if (
      containsInteger &&
      !containsFloat &&
      !NumericValueObject.isInteger(candidate)
    ) {
      return false;
    }

    if (
      containsFloat &&
      !containsInteger &&
      !NumericValueObject.isFloat(candidate)
    ) {
      return false;
    }

    if (!NumericValueObject.isWithinBounds(candidate, minValue, maxValue)) {
      return false;
    }

    if (
      !NumericValueObject.isAllowedSign(candidate, {
        containsPositive,
        containsNegative,
      })
    ) {
      return false;
    } else if (!NumericValueObject.isAllowedZero(candidate, { containsZero })) {
      return false;
    }

    return true;
  }

  static isInteger(value: number): boolean {
    return Number.isInteger(value);
  }

  static isFloat(value: number): boolean {
    return Number.isFinite(value) && value % 1 !== 0;
  }

  static isWithinBounds(
    value: number,
    minValue: number | undefined,
    maxValue: number | undefined,
  ): boolean {
    return (
      (minValue == null || value >= minValue) &&
      (maxValue == null || value <= maxValue)
    );
  }

  static isAllowedSign(value: number, options: IsAllowedSignOptions): boolean {
    const { containsPositive, containsNegative } = options;

    if (value === 0) {
      return false;
    }

    return (
      (containsPositive && !containsNegative && value > 0) ||
      (containsNegative && !containsPositive && value < 0) ||
      (containsPositive && containsNegative)
    );
  }

  static isAllowedZero(value: number, options: IsAllowedZeroOptions): boolean {
    const { containsZero } = options;
    return containsZero || value !== 0;
  }

  static isValidOptions(
    candidate: unknown,
  ): candidate is NumericValueObjectOptions {
    if (typeof candidate !== 'object' || candidate === null) {
      return false;
    }

    const options = candidate as NumericValueObjectOptions;
    const {
      containsZero,
      containsInteger,
      containsFloat,
      containsNegative,
      containsPositive,
      maxValue,
      minValue,
    } = options;

    if (
      typeof containsZero !== 'boolean' ||
      typeof containsInteger !== 'boolean' ||
      typeof containsFloat !== 'boolean' ||
      typeof containsNegative !== 'boolean' ||
      typeof containsPositive !== 'boolean' ||
      (maxValue && typeof maxValue !== 'number') ||
      (minValue && typeof minValue !== 'number')
    ) {
      return false;
    }

    return true;
  }
}
