import { ProductImportedDomainEvent } from '@domain-events/product';
import { ProductQuantityValueObject } from '@value-objects/product';
import { ProductInStockState } from './product-in-stock.state';
import { ProductState } from './product.state.abstract';

export class ProductCreatedState extends ProductState {
  applyImportProducts(event: ProductImportedDomainEvent): void {
    this.product.addEvent(event);
    this.addAmountOfProduct(event.quantity);
    this.product.changeState(new ProductInStockState(this.product));
  }

  private addAmountOfProduct(quantity: ProductQuantityValueObject) {
    this.product.quantity = ProductQuantityValueObject.create(
      quantity.unpack(),
    );
  }
}
