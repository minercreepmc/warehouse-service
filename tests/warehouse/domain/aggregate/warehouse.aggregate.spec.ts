import {
  CityValueObject,
  DistrictValueObject,
  LatitudeValueObject,
  LongitudeValueObject,
  PostalCodeValueObject,
  ProvinceValueObject,
} from '@common-value-object/location';
import { WarehouseAggregate } from '@warehouse-aggregate';
import { WarehouseCreatedDomainEvent } from '@warehouse-domain-events';
import {
  WarehouseAddressValueObject,
  WarehouseCapacityUnit,
  WarehouseCapacityValueObject,
  WarehouseCordinatesValueObject,
  WarehouseIdValueObject,
  WarehouseNameValueObject,
} from '@warehouse-value-object/warehouse';
import { UUID } from 'common-base-classes';

describe('WarehouseAggregate', () => {
  const id = UUID.create();
  const name = new WarehouseNameValueObject('Warehouse 1');
  const address = new WarehouseAddressValueObject({
    city: new CityValueObject('City 1'),
    district: new DistrictValueObject('District 1'),
    province: new ProvinceValueObject('Province 1'),
    postalCode: new PostalCodeValueObject('Postal Code 1'),
  });
  const coordinates = new WarehouseCordinatesValueObject({
    latitude: new LatitudeValueObject(1),
    longitude: new LongitudeValueObject(1),
  });
  const capacity = new WarehouseCapacityValueObject({
    units: 
  })
  const event = new WarehouseCreatedDomainEvent({
    id,
    name,
    address,
    coordinates,
    capacity,
  });

  describe('constructor', () => {
    it('creates an instance of WarehouseAggregate', () => {
      const warehouse = new WarehouseAggregate(id);
      expect(warehouse).toBeInstanceOf(WarehouseAggregate);
    });

    it('sets the ID of the warehouse', () => {
      const warehouse = new WarehouseAggregate(id);
      expect(warehouse.id).toEqual(id);
    });

    it('initializes the products array', () => {
      const warehouse = new WarehouseAggregate(id);
      expect(warehouse.details.products).toEqual([]);
    });
  });

  describe('applyCreateWarehouse', () => {
    it('sets the name of the warehouse', () => {
      const warehouse = new WarehouseAggregate(id);
      warehouse.applyCreateWarehouse(event);
      expect(warehouse.details.name).toEqual(name);
    });

    it('sets the address of the warehouse', () => {
      const warehouse = new WarehouseAggregate(id);
      warehouse.applyCreateWarehouse(event);
      expect(warehouse.details.address).toEqual(address);
    });

    it('sets the coordinates of the warehouse', () => {
      const warehouse = new WarehouseAggregate(id);
      warehouse.applyCreateWarehouse(event);
      expect(warehouse.details.coordinates).toEqual(coordinates);
    });

    it('sets the capacity of the warehouse', () => {
      const warehouse = new WarehouseAggregate(id);
      warehouse.applyCreateWarehouse(event);
      expect(warehouse.details.capacity).toEqual(capacity);
    });
  });
});
