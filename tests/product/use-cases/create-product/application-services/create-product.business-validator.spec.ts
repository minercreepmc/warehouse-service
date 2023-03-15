import { ProductDomainException } from '@product-domain-exceptions';
import { ProductDomainService } from '@product-domain-services';
import { CreateProductBusinessValidator } from '@product-use-case/create-product/application-services';
import { ProductNameValueObject } from '@product-value-object';
import { mock, MockProxy } from 'jest-mock-extended';

describe('CreateProductBusinessValidator', () => {
  let validator: CreateProductBusinessValidator;
  let domainService: MockProxy<ProductDomainService>;

  beforeEach(() => {
    domainService = mock<ProductDomainService>();
    validator = new CreateProductBusinessValidator(domainService);
  });

  afterEach(() => {
    validator.exceptions = [];
  });

  it('should return a valid response if the product does not exist', async () => {
    domainService.isProductExist.mockResolvedValue(false);

    const domainData = {
      name: new ProductNameValueObject('New Product'),
    };

    const response = await validator.validate(domainData);

    expect(response.isValid).toBe(true);
    expect(response.exceptions).toEqual([]);
  });

  it('should return an invalid response if the product already exists', async () => {
    domainService.isProductExist.mockResolvedValue(true);

    const domainData = {
      name: new ProductNameValueObject('Existing Product'),
    };

    const response = await validator.validate(domainData);

    expect(response.isValid).toBe(false);
    expect(response.exceptions).toEqual([
      new ProductDomainException.NameIsExist(),
    ]);
  });

  it('should clear any existing exceptions before running validation', async () => {
    validator.exceptions.push(new ProductDomainException.NameIsExist());

    domainService.isProductExist.mockResolvedValue(false);

    const domainData = {
      name: new ProductNameValueObject('New Product'),
    };

    const response = await validator.validate(domainData);

    expect(response.isValid).toBe(true);
    expect(response.exceptions).toEqual([]);
  });
});
