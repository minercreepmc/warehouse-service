import {
  ProductCreatedDomainEvent,
  ProductsImportedDomainEvent,
  ProductsShippedDomainEvent,
} from '@domain-events/product';
import { ProductThumbnailsAddedDomainEvent } from '@domain-events/product/thumbnail-added/thumbnail-added.domain-event';
import { IState } from 'common-base-classes';
import { ProductAggregate } from '../product.aggregate';
import { ProductAggregateApply } from '../product.aggregate.interface';

export interface IProductState
  extends IState<ProductAggregate>,
    ProductAggregateApply {}

export abstract class ProductState implements IProductState {
  aggregate: ProductAggregate;
  constructor(product: ProductAggregate) {
    this.aggregate = product;
  }

  get product() {
    return this.aggregate;
  }

  applyCreateProduct(event: ProductCreatedDomainEvent): void {
    return;
  }

  applyImportProducts(event: ProductsImportedDomainEvent): void {
    return;
  }

  applyShipProducts(event: ProductsShippedDomainEvent): void {
    return;
  }

  applyThumbnailsProduct(event: ProductThumbnailsAddedDomainEvent): void {
    this.product.addEvent(event);
    this.product.thumbnails = event.thumbnails;
  }
  // abstract pendingImportProduct(state: ProductState): void;
  // abstract cancelPendingImportProduct(state: ProductState): void;
  // abstract productReadyToShipping(state: IState): void;
  // abstract productsShipping(state: IState): void;
  // abstract productOutOfStock(state: IState): void;
}
