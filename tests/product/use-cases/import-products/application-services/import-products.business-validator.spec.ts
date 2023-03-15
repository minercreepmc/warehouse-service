import { ProductDomainException } from '@product-domain-exceptions';
import { ProductDomainService } from '@product-domain-services';
import { ImportProductsBusinessValidator } from '@product-use-case/import-products/application-services';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { mockDeep, MockProxy } from 'jest-mock-extended';

describe('ImportProductsBusinessValidator', () => {
  let businessValidator: ImportProductsBusinessValidator;
  let productDomainServiceMock: MockProxy<ProductDomainService>;

  beforeEach(() => {
    productDomainServiceMock = mockDeep<ProductDomainService>();
    businessValidator = new ImportProductsBusinessValidator(
      productDomainServiceMock,
    );
  });

  it('should return a valid response when product exists', async () => {
    // Arrange
    const domainData = {
      name: new ProductNameValueObject('test product'),
      quantity: new ProductQuantityValueObject(10),
    };
    productDomainServiceMock.isProductExist.mockResolvedValueOnce(true);

    // Act
    const response = await businessValidator.validate(domainData);

    // Assert
    expect(productDomainServiceMock.isProductExist).toHaveBeenCalledWith(
      domainData.name,
    );
    expect(response.isValid).toBe(true);
    expect(response.exceptions.length).toBe(0);
  });

  it('should return an invalid response when product does not exist', async () => {
    // Arrange
    const domainData = {
      name: new ProductNameValueObject('test product'),
      quantity: new ProductQuantityValueObject(10),
    };
    productDomainServiceMock.isProductExist.mockResolvedValueOnce(false);

    // Act
    const response = await businessValidator.validate(domainData);

    // Assert
    expect(productDomainServiceMock.isProductExist).toHaveBeenCalledWith(
      domainData.name,
    );
    expect(response.isValid).toBe(false);
    expect(response.exceptions).toEqual(
      expect.arrayContaining([new ProductDomainException.NameIsNotExist()]),
    );
  });
});
