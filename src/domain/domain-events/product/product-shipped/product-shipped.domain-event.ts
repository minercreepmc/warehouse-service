import { DomainEvent } from 'common-base-classes';
import { IProductShippedDomainEvent } from './product-shipped.domain-event.interface';

export class ProductShippedDomainEvent extends DomainEvent<IProductShippedDomainEvent.Details> {
  constructor(props: IProductShippedDomainEvent.Props) {
    super(props);
  }
}
