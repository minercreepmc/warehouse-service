import type {
  ProductCreatedDomainEvent,
  ProductsImportedDomainEvent,
  ProductsShippedDomainEvent,
  ProductThumbnailsAddedDomainEvent,
} from '@product-domain-events';
import { ProductLoadEntity } from '@product-entities';
import type { ProductQuantityValueObject } from '@product-value-object';
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
  ): ProductLoadEntity {
    return new ProductLoadEntity(UUID.create(), { quantity });
  }

  addContainer(container: ProductLoadEntity) {
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
