import type {
  ProductCreatedDomainEvent,
  ProductsImportedDomainEvent,
  ProductsExportedDomainEvent,
} from '@product-domain-events';
import type { ProductLoadEntity } from '@product-entities';
import type {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { Queue } from 'typescript-collections';

export interface ProductAggregateApply {
  applyCreateProduct(event: ProductCreatedDomainEvent): void;
  applyImportProducts(event: ProductsImportedDomainEvent): void;
  applyExportProducts(event: ProductsExportedDomainEvent): void;
}

export enum ProductAggregateApplyMethodNames {
  CREATE_PRODUCT = 'applyCreateProduct',
  IMPORT_PRODUCTS = 'applyImportProducts',
  EXPORT_PRODUCTS = 'applyExportProducts',
}

export interface ProductAggregateDetails {
  name: ProductNameValueObject;
  // quantities: ProductQuantityValueObject;
  // unit: ProductUnitValueObject;
  totalQuantity: ProductQuantityValueObject;
  loads: Queue<ProductLoadEntity>;
}

export interface CreateProductAggegateOptions {
  name: ProductNameValueObject;
}

export interface ImportProductsAggregateOptions {
  name: ProductNameValueObject;
  quantity: ProductQuantityValueObject;
}

export interface ExportProductsAggregateOptions {
  name: ProductNameValueObject;
  quantity: ProductQuantityValueObject;
}
