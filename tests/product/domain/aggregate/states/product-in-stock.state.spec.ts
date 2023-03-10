import { ProductAggregate } from '@product-aggregate';
import {
  ProductInStockState,
  ProductOutOfStockState,
} from '@product-aggregate/states';
import { ProductDomainError } from '@product-domain-errors';
import {
  ProductsExportedDomainEvent,
  ProductsExportedDomainEventDetails,
} from '@product-domain-events';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { ID } from 'common-base-classes';

describe('ProductInStockState', () => {
  let product: ProductAggregate;
  let productInStockState: ProductInStockState;

  beforeEach(() => {
    product = new ProductAggregate();
    product.createProduct({ name: new ProductNameValueObject('Test') });
    product.importProducts({
      name: new ProductNameValueObject('Test'),
      quantity: new ProductQuantityValueObject(5),
    });
    productInStockState = product.state as ProductInStockState;
  });
  describe('applyExportProducts', () => {
    it('should throw ProductDomainError.QuantityIsNotEnough if quantity to export is not enough', () => {
      const details: ProductsExportedDomainEventDetails = {
        name: new ProductNameValueObject('Test'),
        quantity: new ProductQuantityValueObject(10),
      };
      const event = new ProductsExportedDomainEvent({
        productId: new ID('1'),
        eventDetails: details,
      });

      expect(() => {
        productInStockState.applyExportProducts(event);
      }).toThrow(ProductDomainError.QuantityIsNotEnough);
    });

    it('should ship amount of products and update total quantity', () => {
      const details: ProductsExportedDomainEventDetails = {
        name: new ProductNameValueObject('Test'),
        quantity: new ProductQuantityValueObject(4),
      };
      const event = new ProductsExportedDomainEvent({
        productId: new ID('1'),
        eventDetails: details,
      });

      productInStockState.applyExportProducts(event);

      expect(product.totalQuantity.getValue()).toEqual(1);
      expect(product.loads.size()).toEqual(1);
      expect(product.state).toBeInstanceOf(ProductInStockState);
    });

    it('should remove container if the container quantity is empty', () => {
      const details: ProductsExportedDomainEventDetails = {
        name: new ProductNameValueObject('Test'),
        quantity: new ProductQuantityValueObject(5),
      };
      const event = new ProductsExportedDomainEvent({
        productId: new ID('1'),
        eventDetails: details,
      });

      productInStockState.applyExportProducts(event);

      expect(product.totalQuantity.getValue()).toEqual(0);
      expect(product.loads.size()).toEqual(0);
      expect(product.state).toBeInstanceOf(ProductOutOfStockState);
    });
  });
});
