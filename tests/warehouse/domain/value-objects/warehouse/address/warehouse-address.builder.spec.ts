import { WarehouseAddressBuilder } from '@warehouse-value-object/warehouse';

describe('WarehouseAddressBuilder', () => {
  it('should build a warehouse address value object', () => {
    const builder = new WarehouseAddressBuilder();
    const address = builder
      .withCity('New York')
      .withDistrict('Manhattan')
      .withProvince('New York')
      .withPostalCode('10001')
      .withWard('Midtown')
      .withStreet('Fifth Avenue')
      .build();

    expect(address).toBeDefined();
    expect(address.unpack()).toEqual({
      city: 'New York',
      district: 'Manhattan',
      province: 'New York',
      postalCode: '10001',
      ward: 'Midtown',
      street: 'Fifth Avenue',
    });
  });
});
