import {
  ProductDomainEvent,
  ProductDomainEventDetails,
  ProductDomainEventOptions,
} from '@product-domain-events';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { UUID } from 'common-base-classes';

describe('ProductDomainEvent', () => {
  const productId = UUID.create();
  const productName = new ProductNameValueObject('Test Product');
  const productQuantity = new ProductQuantityValueObject(5);

  const eventDetails: ProductDomainEventDetails = {
    name: productName,
    quantity: productQuantity,
  };

  const eventOptions: ProductDomainEventOptions = {
    productId,
    eventDetails: { name: productName, quantity: productQuantity },
  };

  it('should create a ProductDomainEvent instance', () => {
    const productEvent = new ProductDomainEvent(eventOptions);
    expect(productEvent).toBeInstanceOf(ProductDomainEvent);
  });

  it('should have correct property values', () => {
    const productEvent = new ProductDomainEvent(eventOptions);

    expect(productEvent.entityId).toEqual(productId);
    expect(productEvent.details).toEqual(eventDetails);
  });

  it('should allow partial details', () => {
    const partialDetails: Partial<ProductDomainEventDetails> = {
      name: productName,
    };

    const eventOptions: ProductDomainEventOptions = {
      productId,
      eventDetails: partialDetails,
    };

    const productEvent = new ProductDomainEvent(eventOptions);

    expect(productEvent.details).toEqual(partialDetails);
  });
});
