import { CreateProductLoadOptions, ProductLoadMapper } from '@product-entities';
import { ProductQuantityValueObject } from '@product-value-object';
import { ID } from 'common-base-classes';

describe('ProductLoadMapper', () => {
  describe('toDomainOptions', () => {
    it('should convert CreateProductLoadOptions to CreateProductLoadDomainOptions', () => {
      const options: CreateProductLoadOptions = {
        productLoadBarcode: '1234567890',
        productQuantity: 10,
        productId: 'abcd1234',
      };

      const mapper = new ProductLoadMapper();
      const result = mapper.toDomainOptions(options);

      expect(result.productId).toBeInstanceOf(ID);
      expect(result.productId.unpack()).toBe(options.productId);

      expect(result.productLoadBarcode).toBeInstanceOf(ID);
      expect(result.productLoadBarcode.unpack()).toBe(
        options.productLoadBarcode,
      );

      expect(result.productQuantity).toBeInstanceOf(ProductQuantityValueObject);
      expect(result.productQuantity.unpack()).toBe(options.productQuantity);
    });

    it('should not convert value objects', () => {
      const options: CreateProductLoadOptions = {
        productLoadBarcode: new ID('1234567890'),
        productQuantity: new ProductQuantityValueObject(10),
        productId: new ID('abcd1234'),
      };

      const mapper = new ProductLoadMapper();
      const result = mapper.toDomainOptions(options);

      expect(result.productId).toBe(options.productId);
      expect(result.productLoadBarcode).toBe(options.productLoadBarcode);
      expect(result.productQuantity).toBe(options.productQuantity);
    });
  });
});
