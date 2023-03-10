import { ProductAggregate } from '@product-aggregate';
import { ProductCreatedDomainEvent } from '@product-domain-events';
import { ProductNameValueObject } from '@product-value-object';

describe('ProductCreatedDomainEvent', () => {
  const entityType = ProductAggregate.name;
  const eventName = ProductCreatedDomainEvent.name;

  const productName = new ProductNameValueObject('Test Product');
  let product: ProductAggregate;
  let eventDetails: any;

  beforeEach(() => {
    product = new ProductAggregate();
    product.createProduct({
      name: productName,
    });
    eventDetails = {
      name: product.name,
    };
  });

  it('should create a domain event with the correct properties', () => {
    const domainEvent = new ProductCreatedDomainEvent({
      productId: product.id,
      eventDetails,
    });

    expect(domainEvent.entityType).toBe(entityType);
    expect(domainEvent.eventName).toBe(eventName);
    expect(domainEvent.details).toBe(eventDetails);
  });

  it('should have a "name" property that returns the product name', () => {
    const domainEvent = new ProductCreatedDomainEvent({
      productId: product.id,
      eventDetails,
    });

    expect(domainEvent.name).toBe(productName);
  });
});
