import { ProductDomainEvent } from '@domain-events/product';
import { EventStorePort } from 'common-base-classes';

export interface ProductEventStorePort
  extends EventStorePort<ProductDomainEvent> {}

export const productEventStoreDiToken = Symbol('PRODUCT_EVENT_STORE');
