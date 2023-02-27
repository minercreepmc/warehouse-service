import {
  CityValueObject,
  DistrictValueObject,
  PostalCodeValueObject,
  ProvinceValueObject,
  StreetValueObject,
  WardValueObject,
} from '@common-value-object/location';
import { WarehouseAddressValueObject } from './warehouse-address.value-object';

export class WarehouseAddressBuilder {
  private city: string;
  private district: string;
  private province: string;
  private postalCode: string;
  private ward?: string;
  private street?: string;

  withCity(city: string) {
    this.city = city;
    return this;
  }

  withDistrict(district: string) {
    this.district = district;
    return this;
  }

  withProvince(province: string) {
    this.province = province;
    return this;
  }

  withPostalCode(postalCode: string) {
    this.postalCode = postalCode;
    return this;
  }

  withWard(ward: string) {
    this.ward = ward;
    return this;
  }

  withStreet(street: string) {
    this.street = street;
    return this;
  }

  build(): WarehouseAddressValueObject {
    const addressDetails = {
      city: new CityValueObject(this.city),
      district: new DistrictValueObject(this.district),
      province: new ProvinceValueObject(this.province),
      postalCode: new PostalCodeValueObject(this.postalCode),
      ward: new WardValueObject(this.ward),
      street: new StreetValueObject(this.street),
    };

    return new WarehouseAddressValueObject(addressDetails);
  }
}
