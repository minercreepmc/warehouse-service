import { UnitValueObject } from '@common-value-object/quantity';

describe('UnitValueObject', () => {
  describe('isValid', () => {
    it('returns true for valid unit values', () => {
      expect(UnitValueObject.isValid('g')).toBe(true);
      expect(UnitValueObject.isValid('kg')).toBe(true);
      expect(UnitValueObject.isValid('t')).toBe(true);
      expect(UnitValueObject.isValid('lb')).toBe(true);
      expect(UnitValueObject.isValid('oz')).toBe(true);
      expect(UnitValueObject.isValid('ml')).toBe(true);
      expect(UnitValueObject.isValid('l')).toBe(true);
      expect(UnitValueObject.isValid('gal')).toBe(true);
      expect(UnitValueObject.isValid('cm')).toBe(true);
      expect(UnitValueObject.isValid('m')).toBe(true);
      expect(UnitValueObject.isValid('km')).toBe(true);
      expect(UnitValueObject.isValid('in')).toBe(true);
      expect(UnitValueObject.isValid('ft')).toBe(true);
      expect(UnitValueObject.isValid('yd')).toBe(true);
      expect(UnitValueObject.isValid('mi')).toBe(true);
    });

    it('returns false for invalid unit values', () => {
      expect(UnitValueObject.isValid('foo')).toBe(false);
      expect(UnitValueObject.isValid(123)).toBe(false);
      expect(UnitValueObject.isValid(undefined)).toBe(false);
      expect(UnitValueObject.isValid(null)).toBe(false);
    });
  });

  describe('constructor', () => {
    it('creates a new instance for valid unit values', () => {
      expect(() => new UnitValueObject('g')).not.toThrow();
      expect(() => new UnitValueObject('km')).not.toThrow();
    });

    it('throws an exception for invalid unit values', () => {
      expect(() => new UnitValueObject('foo')).toThrow();
      expect(() => new UnitValueObject(123 as unknown as string)).toThrow();
      expect(() => new UnitValueObject(undefined)).toThrow();
      expect(() => new UnitValueObject(null)).toThrow();
    });
  });
});
