import type {
  ProductCreatedDomainEvent,
  ProductsImportedDomainEvent,
  ProductsShippedDomainEvent,
} from '@domain-events/product';
import type {
  ProductNameValueObject,
  ProductQuantityValueObject,
  ProductThumbnailPathValueObject,
} from '@value-objects/product';
import { productDomainEventNames } from '@domain-events/product';
import { ProductContainerEntity } from '@entities/product';
import { Queue } from 'typescript-collections';

export interface ProductAggregateProcess {
  createProduct(data: CreateProductAggegateData): ProductCreatedDomainEvent;
  importProducts(
    data: ImportProductsAggregateData,
  ): ProductsImportedDomainEvent;
  shipProducts(data: ShipProductsAggregateData): ProductsShippedDomainEvent;
}

export interface ProductAggregateApply {
  applyCreateProduct(event: ProductCreatedDomainEvent): void;
  applyImportProducts(event: ProductsImportedDomainEvent): void;
  applyShipProducts(event: ProductsShippedDomainEvent): void;
}

export interface ProductAggregateDetails {
  name: ProductNameValueObject;
  // quantities: ProductQuantityValueObject;
  // unit: ProductUnitValueObject;
  totalQuantity: ProductQuantityValueObject;
  containers: Queue<ProductContainerEntity>;
  thumbnails?: ProductThumbnailPathValueObject[];
}

export interface CreateProductAggegateData {
  name: ProductNameValueObject;
}

export interface ImportProductsAggregateData {
  name: ProductNameValueObject;
  quantity: ProductQuantityValueObject;
}

export interface ShipProductsAggregateData {
  name: ProductNameValueObject;
  quantity: ProductQuantityValueObject;
}

export interface AddThumbnailsAggregateData {
  name: ProductNameValueObject;
  thumbnails: ProductNameValueObject[];
}

// type productInstance = InstanceType<typeof ProductAggregate>;
export enum ProductApplyEventMethodNames {
  CREATE_PRODUCT = 'applyCreateProduct',
  IMPORT_PRODUCTS = 'applyImportProducts',
  SHIP_PRODUCTS = 'applyShipProducts',
  THUMBNAIL_PRODUCTS = 'applyThumbnailsProduct',
}

export const productApplyEventMethods = {
  [productDomainEventNames.PRODUCT_CREATED]:
    ProductApplyEventMethodNames.CREATE_PRODUCT,
  [productDomainEventNames.PRODUCTS_IMPORTED]:
    ProductApplyEventMethodNames.IMPORT_PRODUCTS,
  [productDomainEventNames.PRODUCTS_SHIPPED]:
    ProductApplyEventMethodNames.SHIP_PRODUCTS,
  [productDomainEventNames.PRODUCT_THUMBNAIL_ADDED]:
    ProductApplyEventMethodNames.THUMBNAIL_PRODUCTS,
};
