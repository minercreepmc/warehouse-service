import type { AddThumbnailsAggregateData } from '@product-aggregate';
import { DomainEventData } from 'common-base-classes';

export interface ProductThumbnailsAddedDomainEventDetails
  extends AddThumbnailsAggregateData {}

export interface ProductThumbnailsAddedDomainEventData
  extends DomainEventData<ProductThumbnailsAddedDomainEventDetails> {}
