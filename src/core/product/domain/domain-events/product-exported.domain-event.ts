import { ProductAggregate } from '@product-aggregate';
import type {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { DomainEvent, DomainEventOptions, ID } from 'common-base-classes';

export interface ProductsExportedDomainEventDetails {
  name: ProductNameValueObject;
  quantity?: ProductQuantityValueObject;
  postponed?: ProductQuantityValueObject;
  isPostponed?: boolean;
}

export interface ProductsExportedDomainEventOptions {
  productId: ID;
  eventDetails: ProductsExportedDomainEventDetails;
}

export class ProductsExportedDomainEvent extends DomainEvent<ProductsExportedDomainEventDetails> {
  constructor(options: DomainEventOptions<ProductsExportedDomainEventDetails>) {
    super(options);
  }

  static create(options: ProductsExportedDomainEventOptions) {
    const { eventDetails, productId } = options;

    return new ProductsExportedDomainEvent({
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

  get postponed(): ProductQuantityValueObject {
    return this.details.postponed;
  }

  get isPostponed(): boolean {
    return this.details.isPostponed;
  }
}
