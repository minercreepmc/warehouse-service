import { InvalidOperationException } from '@common-exceptions';
import {
  ProductCreatedDomainEvent,
  ProductsExportedDomainEvent,
  ProductsImportedDomainEvent,
} from '@product-domain-events';
import { ProductInStockState } from './product-in-stock.state';
import { ProductState } from './product.state.abstract';

export class ProductOutOfStockState extends ProductState {
  override applyImportProducts(event: ProductsImportedDomainEvent): void {
    super.applyImportProducts(event);
    if (this instanceof ProductOutOfStockState) {
      this.product.changeState(new ProductInStockState(this.product));
    }
  }

  override applyCreateProduct(event: ProductCreatedDomainEvent): void {
    throw new InvalidOperationException(
      'Cannot create product when it is out of stock',
    );
  }

  override applyExportProducts(event: ProductsExportedDomainEvent): void {
    throw new InvalidOperationException(
      'Cannot export products when it is out of stock',
    );
  }
}
