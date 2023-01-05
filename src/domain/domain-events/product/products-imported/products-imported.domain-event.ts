import { DomainEvent } from 'common-base-classes';
import {
  ProductsImportedDomainEventData,
  ProductsImportedDomainEventDetails,
} from './products-imported.domain-event.interface';

export class ProductsImportedDomainEvent extends DomainEvent<ProductsImportedDomainEventDetails> {
  constructor(data: ProductsImportedDomainEventData) {
    super(data);
  }

  get quantity() {
    return this.details.quantity;
  }

  get name() {
    return this.details.name;
  }

  get unit() {
    return this.details.unit;
  }
}
