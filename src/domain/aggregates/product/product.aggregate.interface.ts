import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@value-objects/product';
import { ICreateEntity } from 'common-base-classes';

export namespace IProductAggregate {
  export interface Details {
    name: ProductNameValueObject;
    quantity: ProductQuantityValueObject;
  }

  export interface ImportProps extends ICreateEntity<Details> {}

  export interface ShipProps extends ICreateEntity<Details> {}
}
