import { AbstractValueObject } from 'common-base-classes';
import { WarehouseAddressDetails } from './address/warehouse-address.value-object';
import { WarehouseCordinatesDetails } from './warehouse-cordinates.value-object';

export interface WarehouseLocationWithAddressDetails {
  address: WarehouseAddressDetails;
}

export interface WarehouseLocationWithCordinatesDetails {
  cordinates: WarehouseCordinatesDetails;
}

export type WarehouseLocationDetails =
  | WarehouseLocationWithAddressDetails
  | WarehouseLocationWithCordinatesDetails;

export class WarehouseLocation extends AbstractValueObject<WarehouseLocationDetails> {}
