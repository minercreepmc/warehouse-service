import { InvalidOperationException } from '@common-exceptions';
import type {
  ProductCreatedDomainEvent,
  ProductsExportedDomainEvent,
  ProductsImportedDomainEvent,
} from '@product-domain-events';
import { ProductInStockState } from './product-in-stock.state';
import { ProductState } from './product.state.abstract';

export class ProductCreatedState extends ProductState {
  override applyImportProducts(event: ProductsImportedDomainEvent): void {
    super.applyImportProducts(event);
    if (this instanceof ProductCreatedState) {
      this.product.changeState(new ProductInStockState(this.product));
    }
  }

  override applyCreateProduct(event: ProductCreatedDomainEvent): void {
    throw new InvalidOperationException(
      'Product cannot be created when it already created',
    );
  }

  override applyExportProducts(event: ProductsExportedDomainEvent): void {
    throw new InvalidOperationException(
      'Product cannot be exported when it just have created',
    );
  }
}
