import { ProductAggregate } from '@product-aggregate';
import type {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { DomainEvent, ID } from 'common-base-classes';

export interface ProductsExportedDomainEventDetails {
  name: ProductNameValueObject;
  quantity: ProductQuantityValueObject;
}

export interface ProductsExportedDomainEventOptions {
  productId: ID;
  eventDetails: ProductsExportedDomainEventDetails;
}

export class ProductsExportedDomainEvent extends DomainEvent<ProductsExportedDomainEventDetails> {
  constructor(options: ProductsExportedDomainEventOptions) {
    const { eventDetails, productId } = options;
    super({
      entityId: productId,
      eventName: ProductsExportedDomainEvent.name,
      entityType: ProductAggregate.name,
      eventDetails: eventDetails,
    });
  }

  get name(): ProductNameValueObject {
    return this.details.name;
  }

  get quantity(): ProductQuantityValueObject {
    return this.details.quantity;
  }
}
