import { InvalidOperationException } from '@common-exceptions';
import { ProductAggregate } from '@product-aggregate';
import {
  ProductCreatedState,
  ProductInStockState,
} from '@product-aggregate/states';
import {
  ProductCreatedDomainEvent,
  ProductsExportedDomainEvent,
  ProductsImportedDomainEvent,
  ProductsImportedDomainEventDetails,
} from '@product-domain-events';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { UUID } from 'common-base-classes';

describe('ProductCreatedState', () => {
  let product: ProductAggregate;
  let importFiveDetails: ProductsImportedDomainEventDetails;

  beforeAll(() => {
    product = new ProductAggregate();
    product.createProduct({
      name: new ProductNameValueObject('Test Product'),
    });
    importFiveDetails = {
      name: new ProductNameValueObject('Test Product'),
      quantity: new ProductQuantityValueObject(5),
    };
  });

  it('should apply a import product event and change the state to ProductInStockState', () => {
    const productImportedEvent = new ProductsImportedDomainEvent({
      productId: UUID.create(),
      eventDetails: importFiveDetails,
    });

    expect(product.state).toBeInstanceOf(ProductCreatedState);
    product.state.applyImportProducts(productImportedEvent);
    expect(product.domainEvents).toContain(productImportedEvent);
    expect(product.getNameValue()).toEqual('Test Product');
    expect(product.getTotalQuantityValue()).toEqual(5);
    expect(product.state).toBeInstanceOf(ProductInStockState);
  });

  it('should throw an InvalidOperationError if trying to apply an created event on the ProductCreatedState', () => {
    const productCreatedEvent = new ProductCreatedDomainEvent({
      productId: UUID.create(),
      eventDetails: {
        name: new ProductNameValueObject('Test Product'),
      },
    });

    expect(() => product.state.applyCreateProduct(productCreatedEvent)).toThrow(
      InvalidOperationException,
    );
  });

  it('should throw an InvalidOperationError if trying to apply an exported event on the ProductCreatedState', () => {
    const productExportedEvent = new ProductsExportedDomainEvent({
      productId: UUID.create(),
      eventDetails: {
        name: new ProductNameValueObject('Test Product'),
        quantity: new ProductQuantityValueObject(5),
      },
    });

    expect(() =>
      product.state.applyCreateProduct(productExportedEvent),
    ).toThrow(InvalidOperationException);
  });
});
