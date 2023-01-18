import type {
  ProductCreatedDomainEvent,
  ProductsImportedDomainEvent,
  ProductsShippedDomainEvent,
} from '@domain-events/product';
import { ProductThumbnailsAddedDomainEvent } from '@domain-events/product/thumbnail-added/thumbnail-added.domain-event';
import { ProductContainerEntity } from '@entities/product';
import type { ProductQuantityValueObject } from '@value-objects/product';
import { IState, UUID } from 'common-base-classes';
import type { ProductAggregate } from '../product.aggregate';
import type { ProductAggregateApply } from '../product.aggregate.interface';

export interface IProductState
  extends IState<ProductAggregate>,
    ProductAggregateApply {}

export abstract class ProductState implements IProductState {
  entity: ProductAggregate;
  constructor(product: ProductAggregate) {
    this.entity = product;
  }

  get product() {
    return this.entity;
  }

  applyCreateProduct(event: ProductCreatedDomainEvent): void {
    return;
  }

  applyImportProducts(event: ProductsImportedDomainEvent): void {
    this.product.addEvent(event);
    const container = this.makeContainerFromQuantity(event.quantity);
    this.addContainer(container);
    this.countTotalQuantity(event.quantity);
  }

  applyShipProducts(event: ProductsShippedDomainEvent): void {
    return;
  }

  applyThumbnailsProduct(event: ProductThumbnailsAddedDomainEvent): void {
    this.product.addEvent(event);
    this.product.thumbnails = event.thumbnails;
  }

  makeContainerFromQuantity(
    quantity: ProductQuantityValueObject,
  ): ProductContainerEntity {
    return new ProductContainerEntity(UUID.create(), { quantity });
  }

  addContainer(container: ProductContainerEntity) {
    this.product.containers.enqueue(container);
  }

  countTotalQuantity(quantity: ProductQuantityValueObject) {
    const newQuantity = this.product.totalQuantity.add(quantity);
    this.product.totalQuantity = newQuantity;
  }
  // abstract pendingImportProduct(state: ProductState): void;
  // abstract cancelPendingImportProduct(state: ProductState): void;
  // abstract productReadyToShipping(state: IState): void;
  // abstract productsShipping(state: IState): void;
  // abstract productOutOfStock(state: IState): void;
}
