import type { ProductCreatedDomainEvent } from '@product-domain-events';
import type { ProductContainerEntity } from '@product-entities';
import { ProductQuantityValueObject } from '@product-value-object';
import { Queue } from 'typescript-collections';
import { ProductCreatedState } from './product-created.state';
import { ProductState } from './product.state.abstract';

export class InitialProductState extends ProductState {
  override applyCreateProduct(event: ProductCreatedDomainEvent): void {
    this.product.addEvent(event);
    this.product.name = event.name;
    this.product.containers = new Queue<ProductContainerEntity>();
    this.product.totalQuantity = ProductQuantityValueObject.create(0);
    this.product.changeState(new ProductCreatedState(this.product));
  }
}
