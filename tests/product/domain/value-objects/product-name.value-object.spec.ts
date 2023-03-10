import {
  ArgumentContainsEmptyStringException,
  ArgumentContainsSymbolException,
  ArgumentTooLongException,
  ArgumentTooShortException,
  MultipleExceptions,
} from '@common-exceptions';
import { ProductNameValueObject } from '@product-value-object';

describe('ProductNameValueObject', () => {
  describe('constructor', () => {
    it('should create a ProductNameValueObject', () => {
      const productName = new ProductNameValueObject('Valid Product Name');
      expect(productName.unpack()).toEqual('Valid Product Name');
    });

    it('should create a ProductNameValueObject with symbol', () => {
      const productName = new ProductNameValueObject('Valid-Product Name');
      expect(productName.unpack()).toEqual('Valid-Product Name');
    });

    it('should throw ArgumentContainsEmptyStringException and ArgumentTooShortException when the value is an empty string', () => {
      expect(() => new ProductNameValueObject('')).toThrow(MultipleExceptions);

      try {
        new ProductNameValueObject('');
      } catch (e) {
        expect(e).toBeInstanceOf(MultipleExceptions);

        const multipleExceptions = e as MultipleExceptions;

        expect(multipleExceptions.exceptions).toEqual(
          expect.arrayContaining([
            new ArgumentContainsEmptyStringException(),
            new ArgumentTooShortException(),
          ]),
        );
      }
    });

    it('should throw ArgumentTooShortException when the value is too short and contains a number', () => {
      expect(() => new ProductNameValueObject('P')).toThrow(MultipleExceptions);
      try {
        new ProductNameValueObject('P');
      } catch (e) {
        expect(e).toBeInstanceOf(MultipleExceptions);

        const multipleExceptions = e as MultipleExceptions;

        expect(multipleExceptions.exceptions).toEqual(
          expect.arrayContaining([new ArgumentTooShortException()]),
        );
      }
    });

    it('should throw ArgumentTooLongException when the value is too long', () => {
      const longName = 'Long'.repeat(100);
      expect(() => new ProductNameValueObject(longName + 'A')).toThrow(
        MultipleExceptions,
      );
      try {
        new ProductNameValueObject(longName + 'A');
      } catch (e) {
        expect(e).toBeInstanceOf(MultipleExceptions);
        const multipleExceptions = e as MultipleExceptions;

        expect(multipleExceptions.exceptions).toEqual(
          expect.arrayContaining([new ArgumentTooLongException()]),
        );
      }
    });

    it('should throw ArgumentContainsSymbolException when the value contains a symbol', () => {
      try {
        new ProductNameValueObject('$');
      } catch (e) {
        expect(e).toBeInstanceOf(MultipleExceptions);
        const multipleExceptions = e as MultipleExceptions;

        expect(multipleExceptions.exceptions).toEqual(
          expect.arrayContaining([new ArgumentContainsSymbolException()]),
        );
      }
    });
  });
});
