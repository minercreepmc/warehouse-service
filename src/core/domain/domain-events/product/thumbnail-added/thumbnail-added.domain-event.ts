import {
  ProductNameValueObject,
  ProductThumbnailPathValueObject,
} from '@value-objects/product';
import { DomainEvent } from 'common-base-classes';
import {
  ProductThumbnailsAddedDomainEventData,
  ProductThumbnailsAddedDomainEventDetails,
} from './thumbnail-added.domain-event.interface';

export class ProductThumbnailsAddedDomainEvent extends DomainEvent<ProductThumbnailsAddedDomainEventDetails> {
  constructor(data: ProductThumbnailsAddedDomainEventData) {
    super(data);
  }

  get thumbnails(): ProductThumbnailPathValueObject[] {
    return this.details.thumbnails;
  }

  get productName(): ProductNameValueObject {
    return this.details.name;
  }
}
