import { InvalidOperationException } from '@common-exceptions';
import { ProductAggregate } from '@product-aggregate';
import { InitialProductState } from '@product-aggregate/states';
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
import { UUID } from 'common-base-classes';
import { Queue } from 'typescript-collections';

describe('InitialProductState', () => {
  let productAggregate: ProductAggregate;
  let initialState: InitialProductState;

  beforeEach(() => {
    productAggregate = new ProductAggregate();
    initialState = new InitialProductState(productAggregate);
  });

  it('should apply a create product event and change the state to ProductCreatedState', () => {
    const details: ProductCreatedDomainEventDetails = {
      name: new ProductNameValueObject('Test Product'),
    };
    const productCreatedEvent = new ProductCreatedDomainEvent({
      productId: UUID.create(),
      eventDetails: details,
    });

    initialState.applyCreateProduct(productCreatedEvent);

    expect(productAggregate.domainEvents).toContain(productCreatedEvent);
    expect(productAggregate.getNameValue()).toEqual('Test Product');
    expect(productAggregate.loads).toEqual(new Queue());
    expect(productAggregate.getTotalQuantityValue()).toEqual(0);
    expect(productAggregate.state.constructor.name).toEqual(
      'ProductCreatedState',
    );
  });

  it('should throw an exception when trying to apply an import products event', () => {
    const details: ProductsImportedDomainEventDetails = {
      name: new ProductNameValueObject('Test Product'),
      quantity: new ProductQuantityValueObject(10),
    };

    const importProductsEvent = new ProductsImportedDomainEvent({
      productId: UUID.create(),
      eventDetails: details,
    });

    expect(() =>
      initialState.applyImportProducts(importProductsEvent),
    ).toThrowError(InvalidOperationException);
  });

  it('should throw an exception when trying to apply an export products event', () => {
    const details: ProductsExportedDomainEventDetails = {
      name: new ProductNameValueObject('Test Product'),
      quantity: new ProductQuantityValueObject(10),
    };
    const exportProductsEvent = new ProductsExportedDomainEvent({
      productId: UUID.create(),
      eventDetails: details,
    });

    expect(() =>
      initialState.applyExportProducts(exportProductsEvent),
    ).toThrowError(InvalidOperationException);
  });
});
