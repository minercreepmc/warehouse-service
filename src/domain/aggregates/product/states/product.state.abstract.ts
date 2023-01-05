import {
  ProductCreatedDomainEvent,
  ProductsImportedDomainEvent,
  ProductsShippedDomainEvent,
} from '@domain-events/product';
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
  // abstract pendingImportProduct(state: ProductState): void;
  // abstract cancelPendingImportProduct(state: ProductState): void;
  // abstract productReadyToShipping(state: IState): void;
  // abstract productsShipping(state: IState): void;
  // abstract productOutOfStock(state: IState): void;
}
