import { DomainEvent } from 'common-base-classes';
import {
  ProductCreatedDomainEventData,
  ProductCreatedDomainEventDetails,
} from './product-created.domain-event.interface';

export class ProductCreatedDomainEvent extends DomainEvent<ProductCreatedDomainEventDetails> {
  constructor(data: ProductCreatedDomainEventData) {
    super(data);
  }

  get name() {
    return this.details.name;
  }
}
