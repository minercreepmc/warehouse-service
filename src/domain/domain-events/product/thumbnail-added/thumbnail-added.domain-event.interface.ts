import { AddThumbnailsAggregateData } from '@aggregates/product';
import { DomainEventData } from 'common-base-classes';

export interface ProductThumbnailAddedDomainEventDetails
  extends AddThumbnailsAggregateData {}

export interface ProductThumbnailAddedDomainEventData
  extends DomainEventData<ProductThumbnailAddedDomainEventDetails> {}
