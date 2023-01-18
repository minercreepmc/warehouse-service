import type { ProductsImportedDomainEvent } from '@domain-events/product';
import { ProductInStockState } from './product-in-stock.state';
import { ProductState } from './product.state.abstract';

export class ProductCreatedState extends ProductState {
  override applyImportProducts(event: ProductsImportedDomainEvent): void {
    super.applyImportProducts(event);
    if (this instanceof ProductCreatedState) {
      this.product.changeState(new ProductInStockState(this.product));
    }
  }
}
