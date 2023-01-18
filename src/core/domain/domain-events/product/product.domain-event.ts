import { DomainEvent } from 'common-base-classes';
import {
  ProductDomainEventDetails,
  ProductDomainEventProps,
} from './product.domain-event.interface';

export class ProductDomainEvent extends DomainEvent<ProductDomainEventDetails> {
  readonly details: ProductDomainEventDetails;
  constructor(props: ProductDomainEventProps) {
    super(props);
  }
}
