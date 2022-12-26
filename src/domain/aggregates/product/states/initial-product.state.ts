import { ProductCreatedDomainEvent } from '@domain-events/product';
import { ProductQuantityValueObject } from '@value-objects/product';
import { ProductCreatedState } from './product-created.state';
import { ProductState } from './product.state.abstract';

export class InitialProductState extends ProductState {
  override applyCreateProduct(event: ProductCreatedDomainEvent): void {
    this.product.addEvent(event);
    this.product.name = event.name;
    this.product.quantity = ProductQuantityValueObject.create(0);
    this.product.changeState(new ProductCreatedState(this.product));
  }
}
