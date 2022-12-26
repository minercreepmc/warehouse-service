import { ProductAggregateDetails } from '@aggregates/product/product.aggregate.interface';
import { DomainEventData } from 'common-base-classes';

export interface ProductShippedDomainEventDetails
  extends ProductAggregateDetails {}

export interface ProductShippedDomainEventData
  extends DomainEventData<ProductShippedDomainEventDetails> {}
