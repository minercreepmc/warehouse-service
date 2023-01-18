import { DomainEventData } from 'common-base-classes';
import { ProductCreatedDomainEventDetails } from './product-created';
import { ProductCreatedDomainEvent } from './product-created/product-created.domain-event';
import { ProductsImportedDomainEventDetails } from './products-imported';
import { ProductsImportedDomainEvent } from './products-imported/products-imported.domain-event';
import { ProductsShippedDomainEventDetails } from './products-shipped';
import { ProductsShippedDomainEvent } from './products-shipped/product-shipped.domain-event';
import { ProductThumbnailsAddedDomainEventDetails } from './thumbnail-added';
import { ProductThumbnailsAddedDomainEvent } from './thumbnail-added/thumbnail-added.domain-event';

export type ProductDomainEventDetails = Partial<
  ProductCreatedDomainEventDetails &
    ProductsImportedDomainEventDetails &
    ProductsShippedDomainEventDetails &
    ProductThumbnailsAddedDomainEventDetails
>;

export interface ProductDomainEventProps
  extends DomainEventData<ProductDomainEventDetails> {}

export const productDomainEventConstructorDocuments = {
  ProductCreatedDomainEvent: ProductCreatedDomainEvent,
  ProductsImportedDomainEvent: ProductsImportedDomainEvent,
  ProductsShippedDomainEvent: ProductsShippedDomainEvent,
  ProductThumbnailsAddedDomainEvent: ProductThumbnailsAddedDomainEvent,
};

export enum productDomainEventNames {
  PRODUCT_CREATED = 'ProductCreatedDomainEvent',
  PRODUCTS_IMPORTED = 'ProductsImportedDomainEvent',
  PRODUCTS_SHIPPED = 'ProductsShippedDomainEvent',
  PRODUCT_THUMBNAIL_ADDED = 'ProductThumbnailsAddedDomainEvent',
}

export enum ProductDomainEventClasses {
  Product,
}
