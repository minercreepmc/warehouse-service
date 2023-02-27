import {
  CityValueObject,
  DistrictValueObject,
  PostalCodeValueObject,
  ProvinceValueObject,
  StreetValueObject,
  WardValueObject,
} from '@common-value-object/location';
import {
  WarehouseAddressDetails,
  WarehouseAddressValueObject,
} from '@warehouse-value-object/warehouse';

describe('WarehouseAddressValueObject', () => {
  it('should create an instance of the value object', () => {
    const addressDetails: WarehouseAddressDetails = {
      city: new CityValueObject('São Paulo'),
      district: new DistrictValueObject('Manhattan'),
      province: new ProvinceValueObject('New York'),
      postalCode: new PostalCodeValueObject('10001'),
      ward: new WardValueObject('Midtown'),
      street: new StreetValueObject('Fifth Avenue'),
    };
    const address = new WarehouseAddressValueObject(addressDetails);

    expect(address).toBeDefined();
    expect(address.getDetails()).toEqual(addressDetails);
  });

  it('should throw an error if invalid address details are provided', () => {
    const addressDetails = {
      city: 'New York',
      district: 'Manhattan',
      province: 'New York',
    };

    expect(
      () =>
        new WarehouseAddressValueObject(
          addressDetails as unknown as WarehouseAddressDetails,
        ),
    ).toThrowError('Invalid address details');
  });
});
