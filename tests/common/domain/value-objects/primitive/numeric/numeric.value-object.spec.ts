import { NumericValueObject } from '@common-value-object/primitive/numeric';
import { NumericValueObjectOptions } from '@common-value-object/primitive/numeric/numeric.interface';
import { ArgumentInvalidException } from 'ts-common-exceptions';

describe('NumericValueObject', () => {
  describe('NumericValueObject Utils', () => {
    describe('isInteger', () => {
      it('should return true for integer values', () => {
        expect(NumericValueObject.isInteger(42)).toBe(true);
        expect(NumericValueObject.isInteger(-10)).toBe(true);
        expect(NumericValueObject.isInteger(0)).toBe(true);
      });

      it('should return false for non-integer values', () => {
        expect(NumericValueObject.isInteger(3.14)).toBe(false);
        expect(NumericValueObject.isInteger(NaN)).toBe(false);
        expect(NumericValueObject.isInteger(Infinity)).toBe(false);
        expect(NumericValueObject.isInteger(-5.2)).toBe(false);
      });
    });

    describe('isFloat', () => {
      it('should return true for floating point values', () => {
        expect(NumericValueObject.isFloat(3.14)).toBe(true);
        expect(NumericValueObject.isFloat(-2.5)).toBe(true);
      });

      it('should return false for non-floating point values', () => {
        expect(NumericValueObject.isFloat(42)).toBe(false);
        expect(NumericValueObject.isFloat(-10)).toBe(false);
        expect(NumericValueObject.isFloat(0)).toBe(false);
      });
    });

    describe('isWithinBounds', () => {
      it('should return true if value is within bounds', () => {
        expect(NumericValueObject.isWithinBounds(42, 0, 50)).toBe(true);
        expect(NumericValueObject.isWithinBounds(-10, -20, 0)).toBe(true);
        expect(NumericValueObject.isWithinBounds(0, -10, 10)).toBe(true);
      });

      it('should return false if value is outside of bounds', () => {
        expect(NumericValueObject.isWithinBounds(42, 0, 10)).toBe(false);
        expect(NumericValueObject.isWithinBounds(-10, 0, 10)).toBe(false);
        expect(NumericValueObject.isWithinBounds(0, 10, 20)).toBe(false);
      });

      it('should return true if bounds are not provided', () => {
        expect(
          NumericValueObject.isWithinBounds(42, undefined, undefined),
        ).toBe(true);
      });
    });

    describe('isAllowedSign', () => {
      it('should return true if value has an allowed sign', () => {
        expect(
          NumericValueObject.isAllowedSign(42, {
            containsPositive: true,
            containsNegative: true,
          }),
        ).toBe(true);
        expect(
          NumericValueObject.isAllowedSign(-10, {
            containsPositive: true,
            containsNegative: true,
          }),
        ).toBe(true);
      });

      it('should return false if value does not have an allowed sign', () => {
        expect(
          NumericValueObject.isAllowedSign(42, {
            containsPositive: false,
            containsNegative: true,
          }),
        ).toBe(false);
        expect(
          NumericValueObject.isAllowedSign(0, {
            containsPositive: true,
            containsNegative: true,
          }),
        ).toBe(false);
      });

      it('should return false if positive and negative signs are not allowed', () => {
        expect(
          NumericValueObject.isAllowedSign(42, {
            containsPositive: false,
            containsNegative: false,
          }),
        ).toBe(false);
        expect(
          NumericValueObject.isAllowedSign(-10, {
            containsPositive: false,
            containsNegative: false,
          }),
        ).toBe(false);
        expect(
          NumericValueObject.isAllowedSign(0, {
            containsPositive: false,
            containsNegative: false,
          }),
        ).toBe(false);
      });
    });

    describe('isAllowedZero', () => {
      it('returns true if value is zero and containsZero is true', () => {
        const value = 0;
        const options = {
          containsZero: true,
        };
        expect(NumericValueObject.isAllowedZero(value, options)).toBe(true);
      });

      it('returns true if value is not zero and containsZero is true', () => {
        const value = 42;
        const options = {
          containsZero: true,
        };
        expect(NumericValueObject.isAllowedZero(value, options)).toBe(true);
      });

      it('returns false if value is zero and containsZero is false', () => {
        const value = 0;
        const options = {
          containsZero: false,
        };
        expect(NumericValueObject.isAllowedZero(value, options)).toBe(false);
      });

      it('returns true if value is not zero and containsZero is false', () => {
        const value = 42;
        const options = {
          containsZero: false,
        };
        expect(NumericValueObject.isAllowedZero(value, options)).toBe(true);
      });
    });

    describe('isValidValue', () => {
      it('returns true for a valid number with default options', () => {
        const result = NumericValueObject.isValidValue(42);
        expect(result).toBe(true);
      });

      it('returns true for a valid number with custom options', () => {
        const options = {
          containsPositive: true,
          containsNegative: true,
          containsInteger: true,
          containsFloat: true,
          minValue: -10,
          maxValue: 10,
        };
        const result = NumericValueObject.isValidValue(3.14, options);
        expect(result).toBe(true);
      });

      it('returns false for a non-number', () => {
        const result = NumericValueObject.isValidValue('42');
        expect(result).toBe(false);
      });

      it('returns false for an integer when containsInteger is false', () => {
        const options = { containsInteger: false };
        const result = NumericValueObject.isValidValue(42, options);
        expect(result).toBe(false);
      });

      it('returns false for a float when containsFloat is false', () => {
        const options = { containsFloat: false };
        const result = NumericValueObject.isValidValue(3.14, options);
        expect(result).toBe(false);
      });

      it('returns false for a value outside the min/max bounds', () => {
        const options = { minValue: 0, maxValue: 10 };
        const result = NumericValueObject.isValidValue(-1, options);
        expect(result).toBe(false);
      });

      it('returns false for a negative value when containsPositive is true and containsNegative is false', () => {
        const options = { containsPositive: true, containsNegative: false };
        const result = NumericValueObject.isValidValue(-1, options);
        expect(result).toBe(false);
      });

      it('returns false for a positive value when containsNegative is true and containsPositive is false', () => {
        const options = { containsNegative: true, containsPositive: false };
        const result = NumericValueObject.isValidValue(1, options);
        expect(result).toBe(false);
      });

      it('returns false for zero when containsZero is false', () => {
        const options = { containsZero: false };
        const result = NumericValueObject.isValidValue(0, options);
        expect(result).toBe(false);
      });
    });

    describe('isValidOptions', () => {
      it('returns false for non-object input', () => {
        const input = 123;
        const result = NumericValueObject.isValidOptions(input);
        expect(result).toBe(false);
      });

      it('returns false for null input', () => {
        const input = null;
        const result = NumericValueObject.isValidOptions(input);
        expect(result).toBe(false);
      });

      it('returns false for invalid options object', () => {
        const input = {
          containsZero: 'true',
          containsInteger: 123,
          containsFloat: 'false',
          containsNegative: true,
          containsPositive: 0,
          minValue: 'min',
          maxValue: 'max',
        };
        const result = NumericValueObject.isValidOptions(input);
        expect(result).toBe(false);
      });

      it('returns true for valid options object', () => {
        const input = {
          containsZero: true,
          containsInteger: false,
          containsFloat: true,
          containsNegative: true,
          containsPositive: false,
          minValue: -100,
          maxValue: 100,
        };
        const result = NumericValueObject.isValidOptions(input);
        expect(result).toBe(true);
      });
    });

    describe('constructor', () => {
      it('should create a NumericValueObject instance with valid value and options', () => {
        const value = 5;
        const options = {
          containsZero: true,
          containsInteger: true,
          containsFloat: true,
          containsNegative: true,
          containsPositive: true,
          minValue: -10,
          maxValue: 10,
        };

        const obj = new NumericValueObject(value, options);

        expect(obj.unpack()).toBe(value);
        expect(obj.getOptions()).toEqual(options);
      });

      it('should throw an exception if value is not a number', () => {
        const value = 'not a number' as unknown as number;
        const options = {
          containsZero: true,
          containsInteger: true,
          containsFloat: true,
          containsNegative: true,
          containsPositive: true,
          minValue: -10,
          maxValue: 10,
        };
        expect(() => {
          new NumericValueObject(value, options);
        }).toThrow(ArgumentInvalidException);
      });

      it('should throw an exception if options are not valid', () => {
        const value = 5;
        const options = {
          containsZero: true,
          containsInteger: 'not a boolean', // invalid option
          containsFloat: true,
          containsNegative: true,
          containsPositive: true,
          minValue: -10,
          maxValue: 10,
        } as unknown as NumericValueObjectOptions;

        expect(() => {
          new NumericValueObject(value, options);
        }).toThrow(ArgumentInvalidException);
      });

      it('should throw an exception if value is not valid', () => {
        const value = 15;
        const options = {
          containsZero: true,
          containsInteger: true,
          containsFloat: true,
          containsNegative: true,
          containsPositive: true,
          minValue: -10,
          maxValue: 10,
        };

        expect(() => {
          new NumericValueObject(value, options);
        }).toThrow(ArgumentInvalidException);
      });
    });
  });
});
