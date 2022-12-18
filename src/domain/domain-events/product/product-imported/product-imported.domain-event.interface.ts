import { IProductAggregate } from '@aggregates/product/product.aggregate.interface';
import { DomainEventProps } from 'common-base-classes';

export namespace IProductImportedDomainEvent {
  export interface Details extends IProductAggregate.Details {}

  export interface ImportedProps extends DomainEventProps<Details> {}
}
