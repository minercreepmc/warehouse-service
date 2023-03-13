import {
  ArgumentContainsEmptyStringException,
  ArgumentContainsNegativeException,
} from '@common-exceptions';
import { ValidationResponse } from '@common-interfaces';
import { ImportProductsCommandValidator } from '@product-use-case/import-products/application-services';

describe('ImportProductsCommandValidator', () => {
  let validator: ImportProductsCommandValidator;

  beforeEach(() => {
    validator = new ImportProductsCommandValidator();
  });

  afterEach(() => {
    validator.cleanExceptions();
  });

  describe('validate', () => {
    it('returns a valid validation response for a valid command', () => {
      const command = {
        name: 'Product A',
        quantity: 10,
      };

      const response: ValidationResponse = validator.validate(command);

      expect(response.isValid).toBe(true);
      expect(response.exceptions).toHaveLength(0);
    });

    it('returns an invalid validation response for an invalid name', () => {
      const command = {
        name: '',
        quantity: 10,
      };

      const response: ValidationResponse = validator.validate(command);

      expect(response.isValid).toBe(false);
      expect(response.exceptions).toEqual(
        expect.arrayContaining([new ArgumentContainsEmptyStringException()]),
      );
    });

    it('returns an invalid validation response for an invalid quantity', () => {
      const command = {
        name: 'Product A',
        quantity: -1,
      };

      const response: ValidationResponse = validator.validate(command);

      expect(response.isValid).toBe(false);
      expect(response.exceptions).toEqual(
        expect.arrayContaining([new ArgumentContainsNegativeException()]),
      );
    });

    it('returns an invalid validation response for an invalid name and quantity', () => {
      const command = {
        name: '',
        quantity: -1,
      };

      const response: ValidationResponse = validator.validate(command);

      expect(response.isValid).toBe(false);
      expect(response.exceptions).toEqual(
        expect.arrayContaining([
          new ArgumentContainsEmptyStringException(),
          new ArgumentContainsNegativeException(),
        ]),
      );
    });
  });
});
