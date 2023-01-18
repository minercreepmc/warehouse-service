import { ImportProductsAggregateData } from '@aggregates/product/product.aggregate.interface';
import { DomainEventData } from 'common-base-classes';

export interface ProductsImportedDomainEventDetails
  extends ImportProductsAggregateData {}

export interface ProductsImportedDomainEventData
  extends DomainEventData<ProductsImportedDomainEventDetails> {}
