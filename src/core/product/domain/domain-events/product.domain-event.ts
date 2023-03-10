import { ProductAggregate } from '@product-aggregate';
import { DomainEvent, ID } from 'common-base-classes';
import { ProductCreatedDomainEventDetails } from './product-created.domain-event';
import { ProductsExportedDomainEventDetails } from './product-exported.domain-event';
import { ProductsImportedDomainEventDetails } from './products-imported.domain-event';

export type ProductDomainEventDetails = Partial<
  ProductCreatedDomainEventDetails &
    ProductsImportedDomainEventDetails &
    ProductsExportedDomainEventDetails
>;

export interface ProductDomainEventOptions {
  productId: ID;
  eventDetails: ProductDomainEventDetails;
}

export class ProductDomainEvent extends DomainEvent<ProductDomainEventDetails> {
  readonly details: ProductDomainEventDetails;
  constructor(options: ProductDomainEventOptions) {
    const { eventDetails, productId } = options;
    super({
      entityId: productId,
      eventName: ProductDomainEvent.name,
      entityType: ProductAggregate.name,
      eventDetails: eventDetails,
    });
  }
}
