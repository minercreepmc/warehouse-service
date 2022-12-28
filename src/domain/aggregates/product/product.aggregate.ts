import {
  ProductImportedDomainEvent,
  ProductShippedDomainEvent,
  ProductCreatedDomainEvent,
} from '@domain-events/product';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@value-objects/product';
import { ProductUnitValueObject } from '@value-objects/product/product-unit.value-object';
import { AbstractAggregateRoot, ID, UUID } from 'common-base-classes';
import {
  CreateProductAggegateData,
  ImportProductsAggregateData,
  ProductAggregateDetails,
  ProductAggregateProcess,
  ShipProductsAggregateData,
} from './product.aggregate.interface';
import { InitialProductState, ProductState } from './states';

export class ProductAggregate
  extends AbstractAggregateRoot<Partial<ProductAggregateDetails>>
  implements ProductAggregateProcess
{
  state: InitialProductState;
  changeState(newState: ProductState): void {
    this.state = newState;
  }

  createProduct(data: CreateProductAggegateData): ProductCreatedDomainEvent {
    const event = new ProductCreatedDomainEvent({
      aggregateId: this.id,
      aggregateType: this.constructor.name,
      eventName: ProductCreatedDomainEvent.name,
      details: data,
    });
    this.state.applyCreateProduct(event);
    return event;
  }

  importProducts(
    data: ImportProductsAggregateData,
  ): ProductImportedDomainEvent {
    const event = new ProductImportedDomainEvent({
      aggregateId: this.id,
      aggregateType: this.constructor.name,
      eventName: ProductImportedDomainEvent.name,
      details: data.details,
    });
    this.state.applyImportProducts(event);
    return event;
  }

  shipProducts(data: ShipProductsAggregateData): ProductShippedDomainEvent {
    const event = new ProductShippedDomainEvent({
      aggregateId: this.id,
      aggregateType: this.constructor.name,
      eventName: ProductShippedDomainEvent.name,
      details: data,
    });
    this.state.applyShipProducts(event);
    return event;
  }

  isEnoughToShip(quantity: ProductQuantityValueObject) {
    return this.quantity >= quantity;
  }

  get name() {
    return this.details.name;
  }

  set name(newName: ProductNameValueObject) {
    this.details.name = newName;
  }

  get quantity() {
    return this.details.quantity;
  }

  set quantity(newQuantity: ProductQuantityValueObject) {
    this.details.quantity = newQuantity;
  }

  get unit() {
    return this.details.unit;
  }

  set unit(unitName: ProductUnitValueObject) {
    this.details.unit = unitName;
  }

  constructor(id?: ID) {
    const productId = id ? id : UUID.create();
    const details = {};
    super({ id: productId, details });
    this.state = new InitialProductState(this);
  }
}
