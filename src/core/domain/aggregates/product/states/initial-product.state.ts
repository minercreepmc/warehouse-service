import type { ProductCreatedDomainEvent } from '@domain-events/product';
import type { ProductContainerEntity } from '@entities/product';
import { ProductQuantityValueObject } from '@value-objects/product';
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
