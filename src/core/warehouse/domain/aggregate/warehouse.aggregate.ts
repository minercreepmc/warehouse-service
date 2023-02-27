import { WarehouseCreatedDomainEvent } from '@warehouse-domain-events';
import {
  WarehouseAddressValueObject,
  WarehouseCordinatesValueObject,
  WarehouseIdValueObject,
  WarehouseNameValueObject,
} from '@warehouse-value-object/warehouse';
import { WarehouseCapacityValueObject } from '@warehouse-value-object/warehouse/warehouse-capacity.value-object';
import { AbstractAggregateRoot, UUID } from 'common-base-classes';
import { ProductIdValueObject } from 'src/core/product/domain/value-objects/product-id.value-object';

export interface WarehouseAggregateDetails {
  name: WarehouseNameValueObject;
  address?: WarehouseAddressValueObject;
  cordinates?: WarehouseCordinatesValueObject;
  products: ProductIdValueObject[];
  capacity: WarehouseCapacityValueObject;
  //operatingHours: object;
  //manager: object;
  //type: string;
}

export class WarehouseAggregate extends AbstractAggregateRoot<
  Partial<WarehouseAggregateDetails>
> {
  applyCreateWarehouse(event: WarehouseCreatedDomainEvent) {
    this.name = event.details.name;
    this.address = event.details.address;
    this.cordinates = event.details.cordinates;
    this.capacity = event.details.capacity;
  }

  private set name(name: WarehouseNameValueObject) {
    this.details.name = name;
  }

  private set address(address: WarehouseAddressValueObject) {
    this.details.address = address;
  }

  private set cordinates(cordinates: WarehouseCordinatesValueObject) {
    this.details.cordinates = cordinates;
  }

  private set capacity(capacity: WarehouseCapacityValueObject) {
    this.details.capacity = capacity;
  }

  constructor(id: WarehouseIdValueObject) {
    const warehouseId = id ? id : UUID.create();
    const details = {
      products: [],
    };
    super({ id: warehouseId, details });
  }
}
