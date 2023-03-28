import {
  ProductCreatedDomainEvent,
  ProductDomainEvent,
  ProductDomainEventDetails,
  ProductsExportedDomainEvent,
  ProductsImportedDomainEvent,
} from '@product-domain-events';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { AbstractEventTypeOrmMapper } from 'nest-typeorm-common-classes';
import {
  ProductEventModel,
  ProductEventModelDetails,
  ProductEventModelIndex,
} from './product-event.model';

export const productDomainEventConstructorDocuments = {
  ProductCreatedDomainEvent: ProductCreatedDomainEvent,
  ProductsImportedDomainEvent: ProductsImportedDomainEvent,
  ProductsExportedDomainEvent: ProductsExportedDomainEvent,
};

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
      domainDetails.name = new ProductNameValueObject(ormDetails.name);
    }

    if (ormDetails.quantity) {
      domainDetails.quantity = new ProductQuantityValueObject(
        ormDetails.quantity,
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

    return ormDetails;
  }
}
