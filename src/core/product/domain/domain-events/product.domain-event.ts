import { ProductAggregate } from '@product-aggregate';
import { DomainEvent, DomainEventOptions, ID } from 'common-base-classes';
import {
  ProductDomainEventDetails,
  ProductDomainEventOptions,
} from './product.domain-event.interface';

export class ProductDomainEvent extends DomainEvent<ProductDomainEventDetails> {
  readonly details: ProductDomainEventDetails;
  constructor(options: DomainEventOptions<ProductDomainEventDetails>) {
    super(options);
  }

  static create(options: ProductDomainEventOptions) {
    const { productId, eventDetails } = options;
    return new ProductDomainEvent({
      entityId: productId,
      eventName: ProductDomainEvent.name,
      entityType: ProductAggregate.name,
      eventDetails: eventDetails,
    });
  }
}
