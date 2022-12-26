import { DomainEventData } from 'common-base-classes';
import { ProductCreatedDomainEventDetails } from './product-created';
import { ProductCreatedDomainEvent } from './product-created/product-created.domain-event';
import { ProductsImportedDomainEventDetails } from './products-imported';
import { ProductImportedDomainEvent } from './products-imported/products-imported.domain-event';
import { ProductShippedDomainEventDetails } from './products-shipped';
import { ProductShippedDomainEvent } from './products-shipped/product-shipped.domain-event';

export type ProductDomainEventDetails = Partial<
  ProductCreatedDomainEventDetails &
    ProductsImportedDomainEventDetails &
    ProductShippedDomainEventDetails
>;

export interface ProductDomainEventProps
  extends DomainEventData<ProductDomainEventDetails> {}

export const productDomainEventConstructorDocuments = {
  ProductCreatedDomainEvent: ProductCreatedDomainEvent,
  ProductImportedDomainEvent: ProductImportedDomainEvent,
  ProductShippedDomainEvent: ProductShippedDomainEvent,
};

export enum productDomainEventNames {
  PRODUCT_CREATED = 'ProductCreatedDomainEvent',
  PRODUCTS_IMPORTED = 'ProductImportedDomainEvent',
  PRODUCTS_SHIPPED = 'ProductShippedDomainEvent',
}

export enum ProductDomainEventClasses {
  Product,
}
