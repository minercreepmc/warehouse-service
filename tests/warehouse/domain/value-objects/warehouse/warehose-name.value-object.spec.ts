import { WarehouseNameValueObject } from '@warehouse-value-object/warehouse';
import { ArgumentInvalidException } from 'ts-common-exceptions';

describe('WarehouseNameValueObject', () => {
  describe('constructor', () => {
    it('should create a new WarehouseNameValueObject instance with a valid name', () => {
      const name = 'Example Warehouse Name';
      const warehouseName = new WarehouseNameValueObject(name);
      expect(warehouseName.unpack()).toBe(name);
    });

    it('should throw an ArgumentInvalidException with an invalid name', () => {
      const invalidName = 'Invalid Warehouse Name$';
      expect(() => new WarehouseNameValueObject(invalidName)).toThrow(
        ArgumentInvalidException,
      );
    });
  });

  describe('isValidFormat', () => {
    it('should return true for a valid name', () => {
      const validName = 'Example Warehouse Name';
      expect(WarehouseNameValueObject.isValidFormat(validName)).toBe(true);
    });

    it('should return false for a name with invalid length', () => {
      const invalidLengthName = 'a'.repeat(101);
      expect(WarehouseNameValueObject.isValidFormat(invalidLengthName)).toBe(
        false,
      );
    });

    it('should return false for a name with invalid characters', () => {
      const invalidCharactersName = 'Invalid Warehouse Name$';
      expect(
        WarehouseNameValueObject.isValidFormat(invalidCharactersName),
      ).toBe(false);
    });
  });
});
