import { ArgumentTooShortException } from '@common-exceptions';
import {
  ProductDomainException,
  ProductValidationException,
} from '@product-domain-exceptions';
import { CreateProductCommandValidator } from '@product-use-case/create-product/application-services';
import { CreateProductCommand } from '@product-use-case/create-product/application-services/dtos';

describe('CreateProductCommandValidator', () => {
  let createProductCommandValidator: CreateProductCommandValidator;

  beforeEach(() => {
    createProductCommandValidator = new CreateProductCommandValidator();
  });

  describe('validate', () => {
    it('should return a valid ValidationResponse if the command is valid', () => {
      // Arrange
      const command: CreateProductCommand = { name: 'Product 1' };

      // Act
      const result = createProductCommandValidator.validate(command);

      // Assert
      expect(result.isValid).toBe(true);
      expect(result.exceptions).toEqual([]);
    });

    it('should return an invalid ValidationResponse if the command is invalid', () => {
      // Arrange
      const command: CreateProductCommand = { name: 'P' }; // Name is too short

      // Act
      const result = createProductCommandValidator.validate(command);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.exceptions).toContainEqual(new ArgumentTooShortException());
    });
  });

  describe('checkName', () => {
    it('should add a NameIsTooShort exception if the name is too short', () => {
      // Arrange
      const name = 'P'; // Name is too short

      // Act
      createProductCommandValidator.checkName(name);

      // Assert
      expect(createProductCommandValidator.exceptions).toContainEqual(
        new ArgumentTooShortException(),
      );
    });

    it('should not add any exceptions if the name is valid', () => {
      // Arrange
      const name = 'Product 1';

      // Act
      createProductCommandValidator.checkName(name);

      // Assert
      expect(createProductCommandValidator.exceptions).toEqual([]);
    });
  });

  describe('getValidationResponse', () => {
    it('should return a valid ValidationResponse if there are no exceptions', () => {
      // Arrange
      const exceptions: ProductValidationException[] = [];

      // Act
      const result =
        createProductCommandValidator.getValidationResponse(exceptions);

      // Assert
      expect(result.isValid).toBe(true);
      expect(result.exceptions).toEqual([]);
    });

    it('should return an invalid ValidationResponse if there are exceptions', () => {
      // Arrange
      const exceptions: ProductValidationException[] = [
        new ArgumentTooShortException(),
        new ProductDomainException.NameIsExist(),
      ];

      // Act
      const result =
        createProductCommandValidator.getValidationResponse(exceptions);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.exceptions).toEqual(exceptions);
    });
  });
});
