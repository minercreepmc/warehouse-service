import {
  ImportProductsAggregateOptions,
  ProductAggregate,
} from '@product-aggregate';
import type {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { DomainEvent, ID } from 'common-base-classes';

export interface ProductsImportedDomainEventDetails
  extends ImportProductsAggregateOptions {}

export interface ProductsImportedDomainEventOptions {
  productId: ID;
  eventDetails: ProductsImportedDomainEventDetails;
}

export class ProductsImportedDomainEvent extends DomainEvent<ProductsImportedDomainEventDetails> {
  constructor(options: ProductsImportedDomainEventOptions) {
    const { eventDetails, productId } = options;
    super({
      entityId: productId,
      eventName: ProductsImportedDomainEvent.name,
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
