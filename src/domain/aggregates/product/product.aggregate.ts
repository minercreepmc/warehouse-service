import {
  IProductImportedDomainEvent,
  ProductImportedDomainEvent,
} from '@domain-events/product/product-imported';
import {
  IProductShippedDomainEvent,
  ProductShippedDomainEvent,
} from '@domain-events/product/product-shipped';
import { AbstractAggregateRoot, UUID } from 'common-base-classes';
import { IProductAggregate } from './product.aggregate.interface';

export class ProductAggregate extends AbstractAggregateRoot<
  Partial<IProductAggregate.Details>
> {
  importProduct(importProductProps: IProductAggregate.ImportProps) {
    const props: IProductImportedDomainEvent.ImportedProps = {
      aggregateId: importProductProps.id,
      aggregateType: ProductAggregate.name,
      details: importProductProps.details,
      eventName: ProductImportedDomainEvent.name,
    };
    this.addEvent(new ProductImportedDomainEvent(props));
  }

  shipProducts(shipProductProps: IProductAggregate.ShipProps) {
    const props: IProductShippedDomainEvent.Props = {
      aggregateId: shipProductProps.id,
      aggregateType: this.constructor.name,
      eventName: ProductShippedDomainEvent.name,
      details: shipProductProps.details,
    };

    this.addEvent(new ProductShippedDomainEvent(props));
  }

  constructor() {
    const id = UUID.create();
    const details = {};
    super({ id, details });
  }
}
