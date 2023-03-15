import {
  ProductsImportedDomainEvent,
  ProductsImportedDomainEventDetails,
  ProductsImportedDomainEventOptions,
} from '@product-domain-events';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { UUID } from 'common-base-classes';

describe('ProductsImportedDomainEvent', () => {
  it('should create a domain event with the correct details', () => {
    const name = new ProductNameValueObject('Product A');
    const quantity = new ProductQuantityValueObject(10);

    const eventDetails: ProductsImportedDomainEventDetails = {
      name,
      quantity,
    };

    const options: ProductsImportedDomainEventOptions = {
      productId: UUID.create(),
      eventDetails,
    };

    const domainEvent = new ProductsImportedDomainEvent(options);

    expect(domainEvent.details.name).toBe(name);
    expect(domainEvent.details.quantity).toBe(quantity);
  });

  it('should have the correct getters', () => {
    const name = new ProductNameValueObject('Product A');
    const quantity = new ProductQuantityValueObject(10);

    const eventDetails: ProductsImportedDomainEventDetails = {
      name,
      quantity,
    };

    const options: ProductsImportedDomainEventOptions = {
      productId: UUID.create(),
      eventDetails,
    };

    const domainEvent = new ProductsImportedDomainEvent(options);

    expect(domainEvent.name).toBe(name);
    expect(domainEvent.quantity).toBe(quantity);
  });
});
