import type {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { DomainEvent } from 'common-base-classes';
import type {
  ProductsImportedDomainEventData,
  ProductsImportedDomainEventDetails,
} from './products-imported.domain-event.interface';

export class ProductsImportedDomainEvent extends DomainEvent<ProductsImportedDomainEventDetails> {
  constructor(data: ProductsImportedDomainEventData) {
    super(data);
  }

  get name(): ProductNameValueObject {
    return this.details.name;
  }

  get quantity(): ProductQuantityValueObject {
    return this.details.quantity;
  }
}
