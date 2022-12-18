import { DomainEvent } from 'common-base-classes';
import { IProductImportedDomainEvent } from './product-imported.domain-event.interface';

export class ProductImportedDomainEvent extends DomainEvent<IProductImportedDomainEvent.Details> {
  constructor(props: IProductImportedDomainEvent.ImportedProps) {
    super(props);
  }
}
