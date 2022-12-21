import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@value-objects/product';
import { ProductUnitValueObject } from '@value-objects/product/product-unit.value-object';
import { ICreateEntity } from 'common-base-classes';

export namespace ProductAggregateInterfaces {
  export interface Details {
    name: ProductNameValueObject;
    quantity: ProductQuantityValueObject;
    unit: ProductUnitValueObject;
  }

  export interface CreateProps {
    name: ProductNameValueObject;
  }

  export interface ImportProps extends ICreateEntity<Details> {}

  export interface ShipProps extends ICreateEntity<Details> {}
}
