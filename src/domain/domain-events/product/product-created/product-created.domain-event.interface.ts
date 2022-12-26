import { CreateProductAggegateData } from '@aggregates/product';
import { DomainEventData } from 'common-base-classes';

export interface ProductCreatedDomainEventDetails
  extends CreateProductAggegateData {}
export interface ProductCreatedDomainEventData
  extends DomainEventData<ProductCreatedDomainEventDetails> {}
