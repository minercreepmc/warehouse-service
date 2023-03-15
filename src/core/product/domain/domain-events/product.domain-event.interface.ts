import { ID } from 'common-base-classes';
import { ProductCreatedDomainEventDetails } from './product-created.domain-event';
import { ProductsExportedDomainEventDetails } from './product-exported.domain-event';
import { ProductsImportedDomainEventDetails } from './products-imported.domain-event';

export enum productDomainEventNames {
  PRODUCT_CREATED = 'ProductCreatedDomainEvent',
  PRODUCTS_IMPORTED = 'ProductsImportedDomainEvent',
  PRODUCTS_EXPORTED = 'ProductsExportedDomainEvent',
}

export type ProductDomainEventDetails = Partial<
  ProductCreatedDomainEventDetails &
    ProductsImportedDomainEventDetails &
    ProductsExportedDomainEventDetails
>;

export interface ProductDomainEventOptions {
  productId: ID;
  eventDetails: ProductDomainEventDetails;
}
