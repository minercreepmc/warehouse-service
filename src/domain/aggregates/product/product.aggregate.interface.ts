import type {
  ProductCreatedDomainEvent,
  ProductsImportedDomainEvent,
  ProductsShippedDomainEvent,
} from '@domain-events/product';
import type {
  ProductNameValueObject,
  ProductQuantityValueObject,
  ProductThumbnailPathValueObject,
  ProductUnitValueObject,
} from '@value-objects/product';
import { IEntityData } from 'common-base-classes';
import { productDomainEventNames } from '@domain-events/product';

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
  quantity: ProductQuantityValueObject;
  unit: ProductUnitValueObject;
  thumbnails?: ProductThumbnailPathValueObject[];
}

export interface CreateProductAggegateData {
  name: ProductNameValueObject;
}

export interface ImportProductsAggregateData
  extends IEntityData<ProductAggregateDetails> {}

export interface ShipProductsAggregateData extends ProductAggregateDetails {}

export interface AddThumbnailsAggregateData {
  name: ProductNameValueObject;
  thumbnails: ProductNameValueObject[];
}

// type productInstance = InstanceType<typeof ProductAggregate>;
export enum ProductAggregateApplyEventMethodNames {
  CREATE_PRODUCT = 'applyCreateProduct',
  IMPORT_PRODUCTS = 'applyImportProducts',
  SHIP_PRODUCTS = 'applyShipProducts',
  THUMBNAIL_PRODUCTS = 'applyThumbnailsProduct',
}

export const productAggregateApplyEventMethodNamesDocuments = {
  [productDomainEventNames.PRODUCT_CREATED]:
    ProductAggregateApplyEventMethodNames.CREATE_PRODUCT,
  [productDomainEventNames.PRODUCTS_IMPORTED]:
    ProductAggregateApplyEventMethodNames.IMPORT_PRODUCTS,
  [productDomainEventNames.PRODUCTS_SHIPPED]:
    ProductAggregateApplyEventMethodNames.SHIP_PRODUCTS,
  [productDomainEventNames.PRODUCT_THUMBNAIL_ADDED]:
    ProductAggregateApplyEventMethodNames.THUMBNAIL_PRODUCTS,
};
