import { DomainEvent } from 'common-base-classes';
import {
  ProductShippedDomainEventData,
  ProductShippedDomainEventDetails,
} from './product-shipped.domain-event.interface';

export class ProductShippedDomainEvent extends DomainEvent<ProductShippedDomainEventDetails> {
  constructor(data: ProductShippedDomainEventData) {
    super(data);
  }

  get name() {
    return this.details.name;
  }

  get quantity() {
    return this.details.quantity;
  }

  get unit() {
    return this.details.unit;
  }
}
