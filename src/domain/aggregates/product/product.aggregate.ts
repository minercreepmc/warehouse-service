import {
  IProductImportedDomainEvent,
  ProductImportedDomainEvent,
} from '@domain-events/product/product-imported';
import {
  IProductShippedDomainEvent,
  ProductShippedDomainEvent,
} from '@domain-events/product/product-shipped';
import { ProductQuantityValueObject } from '@value-objects/product';
import { AbstractAggregateRoot, DomainEvent, UUID } from 'common-base-classes';
import { IProductAggregate } from './product.aggregate.interface';

export class ProductAggregate extends AbstractAggregateRoot<
  Partial<IProductAggregate.Details>
> {
  importProducts(importProductProps: IProductAggregate.ImportProps) {
    const props: IProductImportedDomainEvent.ImportedProps = {
      aggregateId: importProductProps.id,
      aggregateType: ProductAggregate.name,
      details: importProductProps.details,
      eventName: ProductImportedDomainEvent.name,
    };
    this.applyChanges(new ProductImportedDomainEvent(props));
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

  applyChanges(event: ProductImportedDomainEvent) {
    const newQuantity = this.quantity.addQuantity(event.quantity);
    this.quantity = newQuantity;
    this.addEvent(event);
  }

  private get quantity() {
    return this.details.quantity;
  }

  private set quantity(newQuantity: ProductQuantityValueObject) {
    this.quantity = newQuantity;
  }

  constructor() {
    const id = UUID.create();
    const details = {};
    super({ id, details });
  }
}
