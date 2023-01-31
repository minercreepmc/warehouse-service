import type { ProductNameValueObject } from '@product-value-object';
import { DomainEventData } from 'common-base-classes';

export interface ProductCreatedDomainEventDetails {
  name: ProductNameValueObject;
}
export interface ProductCreatedDomainEventData
  extends DomainEventData<ProductCreatedDomainEventDetails> {}
