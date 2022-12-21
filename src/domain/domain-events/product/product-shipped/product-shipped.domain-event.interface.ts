import { ProductAggregateInterfaces } from '@aggregates/product/product.aggregate.interface';
import { DomainEventProps } from 'common-base-classes';

export namespace ProductsShippedDomainEventInterfaces {
  export interface Details extends ProductAggregateInterfaces.Details {}
  export interface Props extends DomainEventProps<Details> {}
}
