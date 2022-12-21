import { ProductAggregate } from '@aggregates/product/product.aggregate';
import { ProductDomainEvent } from '@domain-events/product';
import { ProductNameValueObject } from '@value-objects/product';
import { EventStorePort } from 'common-base-classes';

export interface ProductEventStorePort
  extends EventStorePort<ProductDomainEvent> {
  isProductExist(productName: ProductNameValueObject): boolean;
  getProduct(productName: ProductNameValueObject): ProductAggregate;
}

export const productEventStoreDiToken = Symbol('PRODUCT_EVENT_STORE');
