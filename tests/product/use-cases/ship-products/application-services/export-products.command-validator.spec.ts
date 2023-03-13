import {
  ArgumentContainsEmptyStringException,
  ArgumentContainsNegativeException,
} from '@common-exceptions';
import { ExportProductsCommandValidator } from '@product-use-case/export-products/application-services';

describe('ExportProductsCommandValidator', () => {
  let validator: ExportProductsCommandValidator;

  beforeEach(() => {
    validator = new ExportProductsCommandValidator();
  });

  describe('validate', () => {
    it('should return valid when name and quantity are valid', () => {
      const command = { name: 'Product A', quantity: 10 };
      const response = validator.validate(command);
      expect(response.isValid).toBe(true);
    });

    it('should return invalid with exception when name is invalid', () => {
      const command = { name: '', quantity: 10 };
      const response = validator.validate(command);
      expect(response.isValid).toBe(false);
      expect(response.exceptions).toEqual(
        expect.arrayContaining([new ArgumentContainsEmptyStringException()]),
      );
    });

    it('should return invalid with exception when quantity is invalid', () => {
      const command = { name: 'Product A', quantity: -10 };
      const response = validator.validate(command);
      expect(response.isValid).toBe(false);
      expect(response.exceptions).toEqual(
        expect.arrayContaining([new ArgumentContainsNegativeException()]),
      );
    });

    it('should return invalid with multiple exceptions when both name and quantity are invalid', () => {
      const command = { name: '', quantity: -10 };
      const response = validator.validate(command);
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
