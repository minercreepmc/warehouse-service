import { DomainEvent } from 'common-base-classes';
import {
  ProductsImportedDomainEventData,
  ProductsImportedDomainEventDetails,
} from './products-imported.domain-event.interface';

export class ProductImportedDomainEvent extends DomainEvent<ProductsImportedDomainEventDetails> {
  static readonly pattern = this.name;

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
