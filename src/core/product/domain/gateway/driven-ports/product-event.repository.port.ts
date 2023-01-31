import type { ProductAggregate } from '@product-aggregate';
import type { ProductDomainEvent } from '@product-domain-events';
import type { ProductNameValueObject } from '@product-value-object';
import { EventStorePort } from 'common-base-classes';

export interface ProductEventStorePort
  extends EventStorePort<ProductDomainEvent> {
  getProduct(productName: ProductNameValueObject): Promise<ProductAggregate>;
  isProductExist(productName: ProductNameValueObject): Promise<boolean>;
}

export const productEventStoreDiToken = Symbol('PRODUCT_EVENT_STORE');
