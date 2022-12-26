import { ProductShippedDomainEvent } from '@domain-events/product';
import { ArgumentInvalidExeception } from '@tinphamm/common-exceptions';
import { ProductQuantityValueObject } from '@value-objects/product';
import { ProductState } from './product.state.abstract';

export class ProductInStockState extends ProductState {
  override applyShipProducts(event: ProductShippedDomainEvent): void {
    this.product.addEvent(event);
    this.shipAmountOfProducts(event.quantity);
  }

  private shipAmountOfProducts(quantity: ProductQuantityValueObject): void {
    if (!this.product.isEnoughToShip(quantity)) {
      throw new ArgumentInvalidExeception('Quantity is not enough to ship');
    }

    const newQuantityAmount =
      this.product.quantity.unpack() - quantity.unpack();
    this.product.quantity =
      ProductQuantityValueObject.create(newQuantityAmount);
  }
}
