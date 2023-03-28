import { ProductAggregate } from '@product-aggregate';
import { ProductNameValueObject } from '@product-value-object';
import { DomainEvent, DomainEventOptions, ID } from 'common-base-classes';

export interface ProductCreatedDomainEventDetails {
  name: ProductNameValueObject;
}
export interface ProductCreatedDomainEventOptions {
  productId: ID;
  eventDetails: ProductCreatedDomainEventDetails;
}

export class ProductCreatedDomainEvent extends DomainEvent<ProductCreatedDomainEventDetails> {
  constructor(options: DomainEventOptions<ProductCreatedDomainEventDetails>) {
    super(options);
  }

  static create(options: ProductCreatedDomainEventOptions) {
    const { productId, eventDetails } = options;

    return new ProductCreatedDomainEvent({
      entityId: productId,
      eventName: ProductCreatedDomainEvent.name,
      entityType: ProductAggregate.name,
      eventDetails: eventDetails,
    });
  }

  get name() {
    return this.details.name;
  }
}
