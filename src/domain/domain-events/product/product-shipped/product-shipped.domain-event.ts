import { DomainEvent } from 'common-base-classes';
import { ProductsShippedDomainEventInterfaces } from './product-shipped.domain-event.interface';

export class ProductShippedDomainEvent extends DomainEvent<ProductsShippedDomainEventInterfaces.Details> {
  constructor(props: ProductsShippedDomainEventInterfaces.Props) {
    super(props);
  }
}
