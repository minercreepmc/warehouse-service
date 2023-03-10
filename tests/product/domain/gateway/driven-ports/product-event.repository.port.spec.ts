import { ProductAggregate } from '@product-aggregate';
import { ProductEventStorePort } from '@product-gateway/driven-ports';
import { ProductNameValueObject } from '@product-value-object';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

// Set up the mock implementation for the `getProduct` method
const sampleProduct = new ProductAggregate();
const sampleProductName = new ProductNameValueObject('Sample Product');

describe('ProductEventStorePort', () => {
  const productEventStoreMock: DeepMockProxy<ProductEventStorePort> =
    mockDeep<ProductEventStorePort>();

  beforeEach(() => {
    productEventStoreMock.getProduct.mockResolvedValue(sampleProduct);

    productEventStoreMock.isProductExist.mockImplementation((productName) => {
      return Promise.resolve(
        productName.unpack() === sampleProductName.unpack(),
      );
    });
  });
  it('should return product with given name', async () => {
    const result = await productEventStoreMock.getProduct(sampleProductName);
    expect(result).toEqual(sampleProduct);
  });

  it('should return true for existing product name', async () => {
    const result = await productEventStoreMock.isProductExist(
      sampleProductName,
    );
    expect(result).toBe(true);
  });

  it('should return false for non-existing product name', async () => {
    const result = await productEventStoreMock.isProductExist(
      new ProductNameValueObject('Non-existing Product'),
    );
    expect(result).toBe(false);
  });
});
