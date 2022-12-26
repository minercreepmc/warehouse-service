import { ProductAggregateDetails } from '@aggregates/product/product.aggregate.interface';
import { DomainEventData } from 'common-base-classes';

export interface ProductsImportedDomainEventDetails
  extends ProductAggregateDetails {}

export interface ProductsImportedDomainEventData
  extends DomainEventData<ProductsImportedDomainEventDetails> {}
