import { InvalidOperationException } from '@common-exceptions';
import type {
  ProductCreatedDomainEvent,
  ProductsExportedDomainEvent,
  ProductsImportedDomainEvent,
} from '@product-domain-events';
import type { ProductLoadEntity } from '@product-entities';
import { ProductQuantityValueObject } from '@product-value-object';
import { Queue } from 'typescript-collections';
import { ProductCreatedState } from './product-created.state';
import { ProductState } from './product.state.abstract';

export class InitialProductState extends ProductState {
  override applyCreateProduct(event: ProductCreatedDomainEvent): void {
    this.product.addEvent(event);
    this.product.name = event.name;
    this.product.loads = new Queue<ProductLoadEntity>();
    this.product.totalQuantity = new ProductQuantityValueObject(0);
    this.product.changeState(new ProductCreatedState(this.product));
  }

  override applyImportProducts(event: ProductsImportedDomainEvent): void {
    throw new InvalidOperationException(
      'Cannot import product that not yet created',
    );
  }

  override applyExportProducts(event: ProductsExportedDomainEvent): void {
    throw new InvalidOperationException(
      'Cannot ship product that not yet created',
    );
  }
}
