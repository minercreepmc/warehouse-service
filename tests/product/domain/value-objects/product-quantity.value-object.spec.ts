import {
  ArgumentNotANumberException,
  MultipleExceptions,
} from '@common-exceptions';
import { ProductQuantityValueObject } from '@product-value-object';

describe('ProductQuantityValueObject', () => {
  describe('constructor', () => {
    it('should create a valid ProductQuantityValueObject with value 0', () => {
      const pqvo = new ProductQuantityValueObject(0);
      expect(pqvo).toBeInstanceOf(ProductQuantityValueObject);
      expect(pqvo.getValue()).toBe(0);
    });

    it('should create a valid ProductQuantityValueObject with value greater than 0', () => {
      const pqvo = new ProductQuantityValueObject(10);
      expect(pqvo).toBeInstanceOf(ProductQuantityValueObject);
      expect(pqvo.getValue()).toBe(10);
    });

    it('should throw an exception if value is less than 0', () => {
      expect(() => new ProductQuantityValueObject(-1)).toThrow();
    });

    it('should throw an exception if value is not a number', () => {
      try {
        new ProductQuantityValueObject('not a number' as unknown as number);
      } catch (e) {
        expect(e).toBeInstanceOf(MultipleExceptions);
        const multipleExceptions = e as MultipleExceptions;

        expect(multipleExceptions.exceptions).toEqual(
          expect.arrayContaining([new ArgumentNotANumberException()]),
        );
      }
    });
  });
});
