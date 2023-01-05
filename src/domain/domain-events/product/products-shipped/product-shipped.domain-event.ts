import { DomainEvent } from 'common-base-classes';
import {
  ProductsShippedDomainEventData,
  ProductsShippedDomainEventDetails,
} from './product-shipped.domain-event.interface';

export class ProductsShippedDomainEvent extends DomainEvent<ProductsShippedDomainEventDetails> {
  constructor(data: ProductsShippedDomainEventData) {
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
