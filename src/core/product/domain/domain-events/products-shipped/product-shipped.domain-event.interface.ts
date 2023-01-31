import type {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { DomainEventData } from 'common-base-classes';

export interface ProductsShippedDomainEventDetails {
  name: ProductNameValueObject;
  quantity: ProductQuantityValueObject;
}

export interface ProductsShippedDomainEventData
  extends DomainEventData<ProductsShippedDomainEventDetails> {}
