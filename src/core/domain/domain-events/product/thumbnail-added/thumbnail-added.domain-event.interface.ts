import { AddThumbnailsAggregateData } from '@aggregates/product';
import { DomainEventData } from 'common-base-classes';

export interface ProductThumbnailsAddedDomainEventDetails
  extends AddThumbnailsAggregateData {}

export interface ProductThumbnailsAddedDomainEventData
  extends DomainEventData<ProductThumbnailsAddedDomainEventDetails> {}
