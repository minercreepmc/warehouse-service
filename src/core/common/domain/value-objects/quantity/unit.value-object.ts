import { AbstractValueObject } from 'common-base-classes';
import { ArgumentInvalidException } from 'ts-common-exceptions';

export enum UnitOfMeasureEnum {
  GRAM = 'g',
  KILOGRAM = 'kg',
  TON = 't',
  POUND = 'lb',
  OUNCE = 'oz',
  MILLILITER = 'ml',
  LITER = 'l',
  GALLON = 'gal',
  CENTIMETER = 'cm',
  METER = 'm',
  KILOMETER = 'km',
  INCH = 'in',
  FOOT = 'ft',
  YARD = 'yd',
  MILE = 'mi',
}

export class UnitValueObject extends AbstractValueObject<string> {
  static unitOfMeasureEnum = UnitOfMeasureEnum;

  static isValid(value: unknown): value is string {
    if (typeof value !== 'string') {
      return false;
    }

    return Object.values(UnitValueObject.unitOfMeasureEnum).includes(
      value as UnitOfMeasureEnum,
    );
  }

  constructor(value: string) {
    if (!UnitValueObject.isValid(value)) {
      throw new ArgumentInvalidException('Unit value is not valid');
    }
    super({ value });
  }
}
