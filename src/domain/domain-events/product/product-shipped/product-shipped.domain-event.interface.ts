import { IProductAggregate } from '@aggregates/product/product.aggregate.interface';
import { DomainEventProps } from 'common-base-classes';

export namespace IProductShippedDomainEvent {
  export interface Details extends IProductAggregate.Details {}
  export interface Props extends DomainEventProps<Details> {}
}
