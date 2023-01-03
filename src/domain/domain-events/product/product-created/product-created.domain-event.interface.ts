import { ProductNameValueObject } from '@value-objects/product';
import { DomainEventData } from 'common-base-classes';

export interface ProductCreatedDomainEventDetails {
  name: ProductNameValueObject;
}
export interface ProductCreatedDomainEventData
  extends DomainEventData<ProductCreatedDomainEventDetails> {}
