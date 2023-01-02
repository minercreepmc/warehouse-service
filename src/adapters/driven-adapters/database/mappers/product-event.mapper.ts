import {
  ProductDomainEvent,
  ProductDomainEventDetails,
  productDomainEventConstructorDocuments,
} from '@domain-events/product';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
  ProductUnitValueObject,
} from '@value-objects/product';
import { AbstractEventTypeOrmMapper } from 'common-base-classes';
import {
  ProductEventModel,
  ProductEventModelDetails,
  ProductEventModelIndex,
} from '../models';

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

    if (ormDetails.unit) {
      domainDetails.unit = ProductUnitValueObject.create(ormDetails.unit);
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

    if (domainDetails.unit) {
      ormDetails.unit = domainDetails.unit.unpack();
    }

    return ormDetails;
  }
}
