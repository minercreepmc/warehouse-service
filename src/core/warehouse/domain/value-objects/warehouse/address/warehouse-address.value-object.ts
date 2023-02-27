import {
  CityValueObject,
  DistrictValueObject,
  PostalCodeValueObject,
  ProvinceValueObject,
  StreetValueObject,
  WardValueObject,
} from '@common-value-object/location';
import { AbstractValueObject } from 'common-base-classes';
import { ArgumentInvalidException } from 'ts-common-exceptions';

export interface WarehouseAddressDetails {
  city: CityValueObject;
  district: DistrictValueObject;
  province: ProvinceValueObject;
  postalCode: PostalCodeValueObject;
  ward?: WardValueObject;
  street?: StreetValueObject;
}

export class WarehouseAddressValueObject extends AbstractValueObject<WarehouseAddressDetails> {
  constructor(addressDetails: WarehouseAddressDetails) {
    if (!WarehouseAddressValueObject.isValidFormat(addressDetails)) {
      throw new ArgumentInvalidException('Invalid address details');
    }
    super(addressDetails);
  }

  getDetails(): WarehouseAddressDetails {
    return this.details;
  }

  static isValidFormat(candidate: unknown) {
    if (
      !(candidate as WarehouseAddressDetails).city ||
      !(candidate as WarehouseAddressDetails).district ||
      !(candidate as WarehouseAddressDetails).province ||
      !(candidate as WarehouseAddressDetails).postalCode
    ) {
      return false;
    }

    return true;
  }
}
