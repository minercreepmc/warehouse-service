import {
  ProductsExportedDomainEvent,
  ProductsExportedDomainEventOptions,
} from '@product-domain-events';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { UUID } from 'common-base-classes';

describe('ProductsExportedDomainEvent', () => {
  it('should create a new instance of ProductsExportedDomainEvent', () => {
    const name = new ProductNameValueObject('Product A');
    const quantity = new ProductQuantityValueObject(10);
    const options: ProductsExportedDomainEventOptions = {
      productId: UUID.create(),
      eventDetails: { name, quantity },
    };
    const event = new ProductsExportedDomainEvent(options);

    expect(event).toBeInstanceOf(ProductsExportedDomainEvent);
    expect(event.name).toBe(options.eventDetails.name);
    expect(event.quantity).toBe(options.eventDetails.quantity);
  });
});
