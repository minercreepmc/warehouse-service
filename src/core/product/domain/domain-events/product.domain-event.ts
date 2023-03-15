import { ProductAggregate } from '@product-aggregate';
import { DomainEvent, ID } from 'common-base-classes';
import {
  ProductDomainEventDetails,
  ProductDomainEventOptions,
} from './product.domain-event.interface';

export class ProductDomainEvent extends DomainEvent<ProductDomainEventDetails> {
  readonly details: ProductDomainEventDetails;
  constructor(options: ProductDomainEventOptions) {
    const { eventDetails, productId } = options;
    super({
      entityId: productId,
      eventName: ProductDomainEvent.name,
      entityType: ProductAggregate.name,
      eventDetails: eventDetails,
    });
  }
}
