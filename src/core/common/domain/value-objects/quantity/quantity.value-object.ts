import { NumericValueObject } from '@common-value-object/primitive/numeric';
import { AbstractValueObject } from 'common-base-classes';
import { ArgumentInvalidException } from 'ts-common-exceptions';
import {
  CreateQuantityValueObject,
  QuantityValueObjectDetails,
} from './quantity.interface';
import { UnitValueObject } from './unit.value-object';

/**
 * A value object that represents a quantity.
 */
export class QuantityValueObject extends AbstractValueObject<QuantityValueObjectDetails> {
  /**
   * Creates a new QuantityValueObject.
   *
   * @param details The details of the quantity value object.
   * @throws ArgumentInvalidException if the details are not valid.
   */
  constructor(details: CreateQuantityValueObject) {
    if (!QuantityValueObject.isValidFormat(details)) {
      throw new ArgumentInvalidException(
        'Invalid quantity value object details',
      );
    }
    const amount = new NumericValueObject(details.amount);
    const units = new Set(
      details.units.map((unit) => new UnitValueObject(unit)),
    );

    super({ amount, units });
  }

  getAmount(): number {
    return this.details.amount.unpack();
  }

  getUnits(): string[] {
    return Array.from(this.details.units.values()).map((unit) => unit.unpack());
  }

  static validUnits = ['kg', 'g', 'mg', 't', 'l', 'ml'];
  /**
   * Determines if a given set of quantity details is valid.
   *
   * @param quantity The quantity details to validate.
   * @returns True if the quantity details are valid; otherwise, false.
   */
  static isValidFormat(quantity: unknown) {
    if (typeof quantity !== 'object' || quantity === null) {
      return false;
    }
    const pretendQuantity = quantity as CreateQuantityValueObject;
    const { amount, units } = pretendQuantity;

    if (typeof amount !== 'number' || amount < 0) {
      return false;
    }

    if (typeof units !== 'object' || units.length === 0) {
      return false;
    }

    return true;
  }
}
