import { ProductAggregateInterfaces } from '@aggregates/product/product.aggregate.interface';
import { DomainEventProps } from 'common-base-classes';

export namespace ProductCreatedDomainEventInterfaces {
  export interface Details extends ProductAggregateInterfaces.CreateProps {}

  export interface Props extends DomainEventProps<Details> {}
}
