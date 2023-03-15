import { NumericValueObject } from '@common-value-object/primitive/numeric';
import { UnitValueObject } from './unit.value-object';

/**
 * Details of a QuantityValueObject.
 */
export interface QuantityValueObjectDetails {
  /**
   * The amount of the quantity.
   */
  amount: NumericValueObject<any>;
  /**
   * The unit of the quantity.
   */
  units: Set<UnitValueObject>;
}

export interface CreateQuantityValueObject {
  amount: number;
  units: string[];
}
