import { DomainEvent } from 'common-base-classes';
import { ProductsImportedDomainEventInterfaces } from './products-imported.domain-event.interface';

export class ProductImportedDomainEvent extends DomainEvent<ProductsImportedDomainEventInterfaces.Details> {
  constructor(props: ProductsImportedDomainEventInterfaces.ImportedProps) {
    super(props);
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
