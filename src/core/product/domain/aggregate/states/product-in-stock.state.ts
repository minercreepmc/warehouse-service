import type { ProductsShippedDomainEvent } from '@product-domain-events';
import type { ProductQuantityValueObject } from '@product-value-object';
import { ArgumentInvalidException } from 'ts-common-exceptions';
import { ProductState } from './product.state.abstract';

export class ProductInStockState extends ProductState {
  override applyShipProducts(event: ProductsShippedDomainEvent): void {
    //console.log(this.product.totalQuantity.unpack());
    this.shipAmountOfProducts(event.quantity);
    this.removeFromTotal(event.quantity);
    this.product.addEvent(event);
  }

  private shipAmountOfProducts(amount: ProductQuantityValueObject): void {
    if (!this.product.isEnoughToShip(amount)) {
      throw new ArgumentInvalidException('Quantity is not enough to ship');
    }

    let leftOver = amount;
    while (leftOver.unpack() !== 0) {
      const peekContainer = this.product.containers.peek();
      leftOver = peekContainer.shipAmountOfQuantityAndReturnLeftOver(leftOver);
      if (peekContainer.quantity.unpack() === 0) {
        this.product.containers.dequeue();
      }
    }
  }
  private removeFromTotal(amount: ProductQuantityValueObject): void {
    if (this.product.totalQuantity.unpack() < amount.unpack()) {
      throw new ArgumentInvalidException(
        'Quantity want to remove higher than current total',
      );
    }
    this.product.totalQuantity = this.product.totalQuantity.remove(amount);
  }
}
