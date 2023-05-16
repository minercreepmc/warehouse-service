import { InvalidOperationException } from '@common-exceptions';
import { ProductDomainException } from '@product-domain-exceptions';
import type {
  ProductCreatedDomainEvent,
  ProductsExportedDomainEvent,
} from '@product-domain-events';
import { ProductQuantityValueObject } from '@product-value-object';
import { ProductOutOfStockState } from './product-out-of-stock.state';
import { ProductState } from './product.state.abstract';

export class ProductInStockState extends ProductState {
  override applyExportProducts(event: ProductsExportedDomainEvent): void {
    //console.log(this.product.totalQuantity.unpack());
    if (event.isPostponed) {
      this.product.isPostponed = true;
      this.postponeProductForExport(event.postponed);
      this.removePostponeStateWhenItIsExported();
    } else {
      this.exportAmountOfProducts(event.quantity);
      this.removeFromTotal(event.quantity);
      this.changeStateIfOutOfStock();
    }
    this.product.addEvent(event);
  }

  private postponeProductForExport(amount: ProductQuantityValueObject): void {
    this.product.postponed = new ProductQuantityValueObject(
      this.product.postponed.unpack() + amount.unpack(),
    );
  }

  private removePostponeStateWhenItIsExported(): void {
    if (this.product.postponed.unpack() === 0) {
      this.product.isPostponed = false;
    }
  }

  private exportAmountOfProducts(amount: ProductQuantityValueObject): void {
    if (!this.product.isEnoughToExport(amount)) {
      throw new ProductDomainException.QuantityIsNotEnough();
    }

    let leftOver = amount;
    while (leftOver.unpack() !== 0) {
      const peekContainer = this.product.loads.peek();
      leftOver = peekContainer.exportAmountAndReturnLeftOver(leftOver);
      if (peekContainer.quantity.unpack() === 0) {
        this.product.loads.dequeue();
      }
    }
  }
  private removeFromTotal(amount: ProductQuantityValueObject): void {
    if (this.product.totalQuantity.isLessThan(amount)) {
      throw new ProductDomainException.QuantityIsNotEnough();
    }
    this.product.totalQuantity = this.product.totalQuantity.subtract(amount);
  }

  private changeStateIfOutOfStock() {
    if (this.product.totalQuantity.unpack() === 0) {
      this.product.changeState(new ProductOutOfStockState(this.product));
    }
  }

  override applyCreateProduct(event: ProductCreatedDomainEvent): void {
    throw new InvalidOperationException(
      'Product cannot be created when it is in stock',
    );
  }
}
