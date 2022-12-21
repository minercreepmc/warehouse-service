import { ProductAggregateInterfaces } from '@aggregates/product/product.aggregate.interface';
import { DomainEventProps } from 'common-base-classes';

export namespace ProductsImportedDomainEventInterfaces {
  export interface Details extends ProductAggregateInterfaces.Details {}

  export interface ImportedProps extends DomainEventProps<Details> {}
}
