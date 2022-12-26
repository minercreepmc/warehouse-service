import { DomainEvent } from 'common-base-classes';
import {
  ProductShippedDomainEventData,
  ProductShippedDomainEventDetails,
} from './product-shipped.domain-event.interface';

export class ProductShippedDomainEvent extends DomainEvent<ProductShippedDomainEventDetails> {
  constructor(data: ProductShippedDomainEventData) {
    super(data);
  }

  get quantity() {
    return this.details.quantity;
  }
}
