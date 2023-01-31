import {
  ProductDomainEvent,
  productDomainEventConstructorDocuments,
  ProductDomainEventDetails,
} from '@product-domain-events';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
  ProductThumbnailPathValueObject,
} from '@product-value-object';
import { AbstractEventTypeOrmMapper } from 'common-base-classes';
import {
  ProductEventModel,
  ProductEventModelDetails,
  ProductEventModelIndex,
} from './product-event.model';

export class ProductEventTypeOrmMapper extends AbstractEventTypeOrmMapper<
  ProductDomainEvent,
  ProductDomainEventDetails,
  ProductEventModel,
  ProductEventModelDetails
> {
  protected eventConstructorDocuments = productDomainEventConstructorDocuments;

  protected toPersistentIndexColumns(
    event: ProductDomainEvent,
  ): ProductEventModelIndex {
    const productName = event.details.name.unpack();
    return {
      productName,
    };
  }

  protected toDomainDetails(
    ormDetails: ProductEventModelDetails,
  ): ProductDomainEventDetails {
    const domainDetails: ProductDomainEventDetails = {};

    if (ormDetails.name) {
      domainDetails.name = ProductNameValueObject.create(ormDetails.name);
    }

    if (ormDetails.quantity) {
      domainDetails.quantity = ProductQuantityValueObject.create(
        ormDetails.quantity,
      );
    }

    if (ormDetails.thumbnails) {
      domainDetails.thumbnails = ProductThumbnailPathValueObject.createMany(
        ormDetails.thumbnails,
      );
    }

    return domainDetails;
  }

  protected toPersistanceDetails(
    domainDetails: ProductDomainEventDetails,
  ): ProductEventModelDetails {
    const ormDetails: ProductEventModelDetails = {};

    if (domainDetails.name) {
      ormDetails.name = domainDetails.name.unpack();
    }

    if (domainDetails.quantity) {
      ormDetails.quantity = domainDetails.quantity.unpack();
    }

    if (domainDetails.thumbnails) {
      ormDetails.thumbnails = domainDetails.thumbnails.map((thumbnail) =>
        thumbnail.unpack(),
      );
    }

    return ormDetails;
  }
}
