import type {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { DomainEvent } from 'common-base-classes';
import type {
  ProductsShippedDomainEventData,
  ProductsShippedDomainEventDetails,
} from './product-shipped.domain-event.interface';

export class ProductsShippedDomainEvent extends DomainEvent<ProductsShippedDomainEventDetails> {
  constructor(data: ProductsShippedDomainEventData) {
    super(data);
  }

  get name(): ProductNameValueObject {
    return this.details.name;
  }

  get quantity(): ProductQuantityValueObject {
    return this.details.quantity;
  }
}
