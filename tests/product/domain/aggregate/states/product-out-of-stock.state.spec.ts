import { InvalidOperationException } from '@common-exceptions';
import { ProductAggregate } from '@product-aggregate';
import {
  ProductInStockState,
  ProductOutOfStockState,
} from '@product-aggregate/states';
import {
  ProductCreatedDomainEvent,
  ProductCreatedDomainEventDetails,
  ProductsExportedDomainEvent,
  ProductsExportedDomainEventDetails,
  ProductsImportedDomainEvent,
  ProductsImportedDomainEventDetails,
} from '@product-domain-events';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';

describe('ProductOutOfStockState', () => {
  let product: ProductAggregate;
  let productOutOfStockState: ProductOutOfStockState;
  beforeEach(() => {
    product = new ProductAggregate();
    product.createProduct({
      name: new ProductNameValueObject('Test'),
    });
    product.importProducts({
      name: new ProductNameValueObject('Test'),
      quantity: new ProductQuantityValueObject(5),
    });

    product.exportProducts({
      name: new ProductNameValueObject('Test'),
      quantity: new ProductQuantityValueObject(5),
    });
    productOutOfStockState = product.state as ProductOutOfStockState;
  });

  describe('applyImportProducts', () => {
    it('should able to applyImportProducts and change to ProductInStockState', () => {
      const eventDetails: ProductsImportedDomainEventDetails = {
        name: new ProductNameValueObject('Test'),
        quantity: new ProductQuantityValueObject(5),
      };

      const event = new ProductsImportedDomainEvent({
        productId: product.id,
        eventDetails,
      });

      productOutOfStockState.applyImportProducts(event);
      expect(product.getNameValue()).toEqual('Test');
      expect(product.getTotalQuantityValue()).toEqual(5);
      expect(product.state).toBeInstanceOf(ProductInStockState);
    });
  });

  describe('applyCreateProduct', () => {
    it('Should throw an InvalidOperationError when trying to applyCreateProduct', () => {
      const eventDetails: ProductCreatedDomainEventDetails = {
        name: new ProductNameValueObject('Test'),
      };

      const event = new ProductCreatedDomainEvent({
        productId: product.id,
        eventDetails,
      });

      expect(() => productOutOfStockState.applyCreateProduct(event)).toThrow(
        InvalidOperationException,
      );
    });
  });

  describe('applyExportProducts', () => {
    it('Should throw an InvalidOperationError when trying to applyExportProducts', () => {
      const eventDetails: ProductsExportedDomainEventDetails = {
        name: new ProductNameValueObject('Test'),
        quantity: new ProductQuantityValueObject(5),
      };
      const event = new ProductsExportedDomainEvent({
        productId: product.id,
        eventDetails,
      });
      expect(() => productOutOfStockState.applyExportProducts(event)).toThrow(
        InvalidOperationException,
      );
    });
  });
});
