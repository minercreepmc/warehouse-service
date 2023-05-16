import {
  ImportProductsAggregateOptions,
  ProductAggregate,
} from '@product-aggregate';
import type {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { DomainEvent, DomainEventOptions, ID } from 'common-base-classes';

export interface ProductsImportedDomainEventDetails
  extends ImportProductsAggregateOptions {
  postponed?: ProductQuantityValueObject;
  isPostponed?: boolean;
}

export interface ProductsImportedDomainEventOptions {
  productId: ID;
  eventDetails: ProductsImportedDomainEventDetails;
}

export class ProductsImportedDomainEvent extends DomainEvent<ProductsImportedDomainEventDetails> {
  constructor(options: DomainEventOptions<ProductsImportedDomainEventDetails>) {
    super(options);
  }

  static create(options: ProductsImportedDomainEventOptions) {
    const { productId, eventDetails } = options;
    return new ProductsImportedDomainEvent({
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

  get postponed(): ProductQuantityValueObject {
    return this.details.postponed;
  }
}
