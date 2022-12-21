import { DomainEvent } from 'common-base-classes';
import { ProductCreatedDomainEventInterfaces } from './product-created.domain-event.interface';

export class ProductCreatedDomainEvent extends DomainEvent<ProductCreatedDomainEventInterfaces.Details> {
  constructor(props: ProductCreatedDomainEventInterfaces.Props) {
    super(props);
  }

  get name() {
    return this.details.name;
  }
}
