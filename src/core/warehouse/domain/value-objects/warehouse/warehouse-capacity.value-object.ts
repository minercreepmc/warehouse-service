import { QuantityValueObject } from '@common-value-object/quantity';

export enum WarehouseCapacityUnit {
  KILOGRAMS = 'kg',
  POUNDS = 'lb',
  OUNCE = 'oz',
  GRAMS = 'g',
  TONS = 'ton',
}

/**
 * Represents the Warehouse Capacity Value Object.
 *
 * @extends {QuantityValueObject}
 */
export class WarehouseCapacityValueObject extends QuantityValueObject {
  static override validUnits = Object.values(WarehouseCapacityUnit);
}
