import type {
  ProductCreatedDomainEvent,
  ProductImportedDomainEvent,
  ProductShippedDomainEvent,
} from '@domain-events/product';
import type {
  ProductNameValueObject,
  ProductQuantityValueObject,
  ProductUnitValueObject,
} from '@value-objects/product';
import { IEntityData } from 'common-base-classes';
import { productDomainEventNames } from '@domain-events/product';

export interface ProductAggregateProcess {
  createProduct(data: CreateProductAggegateData): ProductCreatedDomainEvent;
  importProducts(data: ImportProductsAggregateData): ProductImportedDomainEvent;
  shipProducts(data: ShipProductsAggregateData): ProductShippedDomainEvent;
}

export interface ProductAggregateApply {
  applyCreateProduct(event: ProductCreatedDomainEvent): void;
  applyImportProducts(event: ProductImportedDomainEvent): void;
  applyShipProducts(event: ProductShippedDomainEvent): void;
}

export interface ProductAggregateDetails {
  name: ProductNameValueObject;
  quantity: ProductQuantityValueObject;
  unit: ProductUnitValueObject;
}

export interface CreateProductAggegateData {
  name: ProductNameValueObject;
}

export interface ImportProductsAggregateData
  extends IEntityData<ProductAggregateDetails> {}

export interface ShipProductsAggregateData extends ProductAggregateDetails {}

// type productInstance = InstanceType<typeof ProductAggregate>;
export enum ProductAggregateApplyEventMethodNames {
  CREATE_PRODUCT = 'applyCreateProduct',
  IMPORT_PRODUCTS = 'applyImportProducts',
  SHIP_PRODUCTS = 'applyShipProducts',
}

export const productAggregateApplyEventMethodNamesDocuments = {
  [productDomainEventNames.PRODUCT_CREATED]:
    ProductAggregateApplyEventMethodNames.CREATE_PRODUCT,
  [productDomainEventNames.PRODUCTS_IMPORTED]:
    ProductAggregateApplyEventMethodNames.IMPORT_PRODUCTS,
  [productDomainEventNames.PRODUCTS_SHIPPED]:
    ProductAggregateApplyEventMethodNames.SHIP_PRODUCTS,
};
