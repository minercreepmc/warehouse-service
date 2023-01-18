import {
  ProductsImportedDomainEvent,
  ProductsShippedDomainEvent,
  ProductCreatedDomainEvent,
  ProductThumbnailsAddedDomainEvent,
} from '@domain-events/product';
import type { ProductContainerEntity } from '@entities/product';
import type {
  ProductNameValueObject,
  ProductQuantityValueObject,
  ProductThumbnailPathValueObject,
} from '@value-objects/product';
import { AbstractAggregateRoot, ID, UUID } from 'common-base-classes';
import { Queue } from 'typescript-collections';
import {
  AddThumbnailsAggregateData,
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

  addThumbnails(data: AddThumbnailsAggregateData) {
    const event = new ProductThumbnailsAddedDomainEvent({
      entityId: this.id,
      entityType: this.constructor.name,
      eventName: ProductThumbnailsAddedDomainEvent.name,
      details: data,
    });
    this.state.applyThumbnailsProduct(event);
    return event;
  }

  createProduct(data: CreateProductAggegateData): ProductCreatedDomainEvent {
    const event = new ProductCreatedDomainEvent({
      entityId: this.id,
      entityType: this.constructor.name,
      eventName: ProductCreatedDomainEvent.name,
      details: data,
    });
    this.state.applyCreateProduct(event);
    return event;
  }

  importProducts(
    data: ImportProductsAggregateData,
  ): ProductsImportedDomainEvent {
    const event = new ProductsImportedDomainEvent({
      entityId: this.id,
      entityType: this.constructor.name,
      eventName: ProductsImportedDomainEvent.name,
      details: data,
    });
    this.state.applyImportProducts(event);
    return event;
  }

  shipProducts(data: ShipProductsAggregateData): ProductsShippedDomainEvent {
    const event = new ProductsShippedDomainEvent({
      entityId: this.id,
      entityType: this.constructor.name,
      eventName: ProductsShippedDomainEvent.name,
      details: data,
    });
    this.state.applyShipProducts(event);
    return event;
  }

  isEnoughToShip(need: ProductQuantityValueObject): boolean {
    return this.totalQuantity.unpack() >= need.unpack();
  }

  get name(): ProductNameValueObject {
    return this.details.name;
  }

  set name(newName: ProductNameValueObject) {
    this.details.name = newName;
  }

  get containers(): Queue<ProductContainerEntity> {
    return this.details.containers;
  }

  set containers(newContainers: Queue<ProductContainerEntity>) {
    this.details.containers = newContainers;
  }

  get totalQuantity(): ProductQuantityValueObject {
    return this.details.totalQuantity;
  }

  set totalQuantity(newQuantity: ProductQuantityValueObject) {
    this.details.totalQuantity = newQuantity;
  }

  get thumbnails() {
    return this.details.thumbnails;
  }

  set thumbnails(newThumbnails: ProductThumbnailPathValueObject[]) {
    this.details.thumbnails = newThumbnails;
  }

  constructor(id?: ID) {
    const productId = id ? id : UUID.create();
    const details = {};
    super({ id: productId, details });
    this.state = new InitialProductState(this);
  }
}
