import type { ImportProductsAggregateData } from '@product-aggregate';
import type { DomainEventData } from 'common-base-classes';

export interface ProductsImportedDomainEventDetails
  extends ImportProductsAggregateData {}

export interface ProductsImportedDomainEventData
  extends DomainEventData<ProductsImportedDomainEventDetails> {}
