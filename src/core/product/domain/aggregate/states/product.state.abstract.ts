import type {
  ProductCreatedDomainEvent,
  ProductsImportedDomainEvent,
  ProductsExportedDomainEvent,
} from '@product-domain-events';
import { ProductLoadEntity } from '@product-entities';
import type { ProductQuantityValueObject } from '@product-value-object';
import { IState, UUID } from 'common-base-classes';
import type { ProductAggregate } from '../product.aggregate';

export interface IProductState extends IState<ProductAggregate> {}

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
    this.addLoad(container);
    this.countTotalQuantity(event.quantity);
  }

  applyExportProducts(event: ProductsExportedDomainEvent): void {
    return;
  }

  makeContainerFromQuantity(
    quantity: ProductQuantityValueObject,
  ): ProductLoadEntity {
    return new ProductLoadEntity({
      productId: UUID.create(),
      productLoadBarcode: UUID.create(),
      productQuantity: quantity,
    });
  }

  addLoad(container: ProductLoadEntity) {
    this.product.loads.enqueue(container);
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
