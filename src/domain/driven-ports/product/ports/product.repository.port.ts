import type { ProductAggregate } from '@aggregates/product';
import type { ProductDomainEvent } from '@domain-events/product';
import type { ProductNameValueObject } from '@value-objects/product';
import { EventStorePort } from 'common-base-classes';

export interface ProductEventStorePort
  extends EventStorePort<ProductDomainEvent> {
  isProductExist(productName: ProductNameValueObject): Promise<boolean>;
  getProduct(productName: ProductNameValueObject): Promise<ProductAggregate>;
}

export const productEventStoreDiToken = Symbol('PRODUCT_EVENT_STORE');
