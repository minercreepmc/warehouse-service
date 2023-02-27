import {
  WarehouseCapacityUnit,
  WarehouseCapacityValueObject,
} from '@warehouse-value-object/warehouse';

describe('WarehouseCapacityValueObject', () => {
  describe('constructor', () => {
    it('should create a valid object with valid units', () => {
      const capacity = new WarehouseCapacityValueObject({
        amount: 100,
        units: [WarehouseCapacityUnit.KILOGRAMS],
      });
      expect(capacity.getAmount()).toBe(100);
      expect(capacity.getUnits()).toEqual([WarehouseCapacityUnit.KILOGRAMS]);
    });

    it('should throw an error if amount is negative', () => {
      expect(
        () =>
          new WarehouseCapacityValueObject({
            amount: -100,
            units: [WarehouseCapacityUnit.KILOGRAMS],
          }),
      ).toThrow();
    });

    it('should throw an error if units are empty', () => {
      expect(
        () => new WarehouseCapacityValueObject({ amount: 100, units: [] }),
      ).toThrow();
    });

    it('should throw an error if units contain an invalid value', () => {
      expect(
        () =>
          new WarehouseCapacityValueObject({ amount: 100, units: ['invalid'] }),
      ).toThrow();
    });
  });
});
