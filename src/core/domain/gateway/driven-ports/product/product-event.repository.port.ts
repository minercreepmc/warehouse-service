import type { ProductAggregate } from '@aggregates/product';
import type { ProductDomainEvent } from '@domain-events/product';
import { ProductNameValueObject } from '@value-objects/product';
import { EventStorePort } from 'common-base-classes';

export interface ProductEventStorePort
  extends EventStorePort<ProductDomainEvent> {
  getProduct(productName: ProductNameValueObject): Promise<ProductAggregate>;
  isProductExist(productName: ProductNameValueObject): Promise<boolean>;
}

export const productEventStoreDiToken = Symbol('PRODUCT_EVENT_STORE');
