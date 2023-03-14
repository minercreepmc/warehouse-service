import { ProductDomainException } from '@product-domain-exceptions';
import { ProductDomainService } from '@product-domain-services';
import { ExportProductsBusinessValidator } from '@product-use-case/export-products/application-services';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { mockDeep, MockProxy } from 'jest-mock-extended';

describe('ExportProductsBusinessValidator', () => {
  let businessValidator: ExportProductsBusinessValidator;
  let productDomainService: MockProxy<ProductDomainService>;

  beforeEach(() => {
    productDomainService = mockDeep<ProductDomainService>();
    businessValidator = new ExportProductsBusinessValidator(
      productDomainService,
    );
  });

  describe('validate', () => {
    it('should return a valid response when the product exists and has enough quantity', async () => {
      const domainData = {
        name: new ProductNameValueObject('Product A'),
        quantity: new ProductQuantityValueObject(10),
      };
      productDomainService.isProductExist.mockResolvedValueOnce(true);
      productDomainService.isEnoughToExport.mockResolvedValueOnce(true);

      const result = await businessValidator.validate(domainData);

      expect(result.isValid).toBe(true);
      expect(result.exceptions).toHaveLength(0);
    });

    it('should return an invalid response when the product does not exist', async () => {
      const domainData = {
        name: new ProductNameValueObject('Product A'),
        quantity: new ProductQuantityValueObject(10),
      };
      productDomainService.isProductExist.mockResolvedValueOnce(false);
      productDomainService.isEnoughToExport.mockResolvedValueOnce(true);

      const result = await businessValidator.validate(domainData);

      expect(result.isValid).toBe(false);
      expect(result.exceptions).toHaveLength(1);
      expect(result.exceptions[0]).toBeInstanceOf(
        ProductDomainException.NameIsNotExist,
      );
    });

    it('should return an invalid response when the product does not have enough quantity', async () => {
      const domainData = {
        name: new ProductNameValueObject('Product A'),
        quantity: new ProductQuantityValueObject(10),
      };

      productDomainService.isProductExist.mockResolvedValueOnce(true);
      productDomainService.isEnoughToExport.mockResolvedValueOnce(false);

      const result = await businessValidator.validate(domainData);

      expect(result.isValid).toBe(false);
      expect(result.exceptions).toHaveLength(1);
      expect(result.exceptions[0]).toBeInstanceOf(
        ProductDomainException.QuantityIsNotEnough,
      );
    });
  });
});
