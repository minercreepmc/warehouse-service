import {
  ProductNameValueObject,
  ProductThumbnailPathValueObject,
} from '@value-objects/product';
import { DomainEvent } from 'common-base-classes';
import {
  ProductThumbnailAddedDomainEventData,
  ProductThumbnailAddedDomainEventDetails,
} from './thumbnail-added.domain-event.interface';

export class ProductThumbnailsAddedDomainEvent extends DomainEvent<ProductThumbnailAddedDomainEventDetails> {
  constructor(data: ProductThumbnailAddedDomainEventData) {
    super(data);
  }

  get thumbnails(): ProductThumbnailPathValueObject[] {
    return this.details.thumbnails;
  }

  get productName(): ProductNameValueObject {
    return this.details.name;
  }
}
