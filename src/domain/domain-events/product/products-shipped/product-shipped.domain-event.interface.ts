import { ProductAggregateDetails } from '@aggregates/product/product.aggregate.interface';
import { DomainEventData } from 'common-base-classes';

export interface ProductsShippedDomainEventDetails
  extends ProductAggregateDetails {}

export interface ProductsShippedDomainEventData
  extends DomainEventData<ProductsShippedDomainEventDetails> {}
