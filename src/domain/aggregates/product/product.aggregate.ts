import { ProductCreatedDomainEvent } from '@domain-events/product/product-created/product-created.domain-event';
import { ProductCreatedDomainEventInterfaces } from '@domain-events/product/product-created/product-created.domain-event.interface';
import {
  ProductsImportedDomainEventInterfaces,
  ProductImportedDomainEvent,
} from '@domain-events/product/product-imported';
import {
  ProductsShippedDomainEventInterfaces,
  ProductShippedDomainEvent,
} from '@domain-events/product/product-shipped';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@value-objects/product';
import { ProductUnitValueObject } from '@value-objects/product/product-unit.value-object';
import { AbstractAggregateRoot, UUID } from 'common-base-classes';
import { ProductAggregateInterfaces } from './product.aggregate.interface';

export class ProductAggregate extends AbstractAggregateRoot<
  Partial<ProductAggregateInterfaces.Details>
> {
  createProduct(createProductProps: ProductAggregateInterfaces.CreateProps) {
    const props: ProductCreatedDomainEventInterfaces.Props = {
      aggregateId: this.id,
      aggregateType: this.constructor.name,
      eventName: ProductCreatedDomainEvent.name,
      details: createProductProps,
    };
    const event = new ProductCreatedDomainEvent(props);
    this.applyCreateProduct(event);
    return event;
  }

  importProducts(importProductProps: ProductAggregateInterfaces.ImportProps) {
    const props: ProductsImportedDomainEventInterfaces.ImportedProps = {
      aggregateId: importProductProps.id,
      aggregateType: ProductAggregate.name,
      details: importProductProps.details,
      eventName: ProductImportedDomainEvent.name,
    };
    const event = new ProductImportedDomainEvent(props);
    this.applyImportProducts(event);
    return event;
  }

  shipProducts(shipProductProps: ProductAggregateInterfaces.ShipProps) {
    const props: ProductsShippedDomainEventInterfaces.Props = {
      aggregateId: shipProductProps.id,
      aggregateType: this.constructor.name,
      eventName: ProductShippedDomainEvent.name,
      details: shipProductProps.details,
    };

    this.addEvent(new ProductShippedDomainEvent(props));
  }

  applyCreateProduct(event: ProductCreatedDomainEvent) {
    this.name = event.name;
    this.quantity = ProductQuantityValueObject.create(0);
    this.addEvent(event);
  }

  applyImportProducts(event: ProductImportedDomainEvent) {
    const newQuantity = this.quantity.addAmount(event.quantity);
    this.quantity = newQuantity;
    this.unit = event.unit;
    this.applyUpdatedAt(event.dateOccurred);
    this.addEvent(event);
  }

  private get name() {
    return this.details.name;
  }

  private set name(newName: ProductNameValueObject) {
    this.details.name = newName;
  }

  private get quantity() {
    return this.details.quantity;
  }

  private set quantity(newQuantity: ProductQuantityValueObject) {
    this.details.quantity = newQuantity;
  }

  private get unit() {
    return this.details.unit;
  }

  private set unit(unitName: ProductUnitValueObject) {
    this.details.unit = unitName;
  }

  constructor() {
    const id = UUID.create();
    const details = {};
    super({ id, details });
  }
}
