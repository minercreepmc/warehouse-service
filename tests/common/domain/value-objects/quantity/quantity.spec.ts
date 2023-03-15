import { QuantityValueObject } from '@common-value-object/quantity';

describe('QuantityValueObject', () => {
  const validQuantity = new QuantityValueObject({
    amount: 10,
    units: ['kg', 'g'],
  });

  describe('isValidFormat', () => {
    it('returns false for non-object input', () => {
      const result = QuantityValueObject.isValidFormat('invalid');
      expect(result).toBe(false);
    });

    it('returns false for null input', () => {
      const result = QuantityValueObject.isValidFormat(null);
      expect(result).toBe(false);
    });

    it('returns false for invalid amount', () => {
      const input = { amount: 'invalid', units: ['kg'] };
      const result = QuantityValueObject.isValidFormat(input);
      expect(result).toBe(false);
    });

    it('returns false for negative amount', () => {
      const input = { amount: -10, units: ['kg'] };
      const result = QuantityValueObject.isValidFormat(input);
      expect(result).toBe(false);
    });

    it('returns false for invalid units', () => {
      const input = { amount: 10, units: 'invalid' };
      const result = QuantityValueObject.isValidFormat(input);
      expect(result).toBe(false);
    });

    it('returns false for empty units array', () => {
      const input = { amount: 10, units: [] };
      const result = QuantityValueObject.isValidFormat(input);
      expect(result).toBe(false);
    });

    it('returns true for valid input', () => {
      const input = { amount: 10, units: ['kg'] };
      const result = QuantityValueObject.isValidFormat(input);
      expect(result).toBe(true);
    });
  });

  describe('getAmount', () => {
    it('returns the amount of the quantity', () => {
      expect(validQuantity.getAmount()).toBe(10);
    });
  });

  describe('getUnits', () => {
    it('returns the units of the quantity', () => {
      expect(validQuantity.getUnits()).toEqual(
        expect.arrayContaining(['g', 'kg']),
      );
    });
  });
});
