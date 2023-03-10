import { ProductAggregate } from '@product-aggregate';
import { ProductNameValueObject } from '@product-value-object';
import { DomainEvent, ID } from 'common-base-classes';

export interface ProductCreatedDomainEventDetails {
  name: ProductNameValueObject;
}
export interface ProductCreatedDomainEventOptions {
  productId: ID;
  eventDetails: ProductCreatedDomainEventDetails;
}

export class ProductCreatedDomainEvent extends DomainEvent<ProductCreatedDomainEventDetails> {
  constructor(data: ProductCreatedDomainEventOptions) {
    const { productId, eventDetails } = data;
    super({
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
