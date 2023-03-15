import { InvalidOperationException } from '@common-exceptions';
import { ProductDomainException } from '@product-domain-exceptions';
import type {
  ProductCreatedDomainEvent,
  ProductsExportedDomainEvent,
} from '@product-domain-events';
import type { ProductQuantityValueObject } from '@product-value-object';
import { ProductOutOfStockState } from './product-out-of-stock.state';
import { ProductState } from './product.state.abstract';

export class ProductInStockState extends ProductState {
  override applyExportProducts(event: ProductsExportedDomainEvent): void {
    //console.log(this.product.totalQuantity.unpack());
    this.exportAmountOfProducts(event.quantity);
    this.removeFromTotal(event.quantity);
    this.changeStateIfOutOfStock();
    this.product.addEvent(event);
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
