import { CityValueObject } from '@common-value-object/location';
import { ProductIdValueObject } from '@product-value-object';
import { WarehouseCreatedDomainEvent } from '@warehouse-domain-events';
import {
  WarehouseAddressValueObject,
  WarehouseCapacityValueObject,
  WarehouseCordinatesValueObject,
  WarehouseIdValueObject,
  WarehouseNameValueObject,
} from '@warehouse-value-object/warehouse';
import { UUID } from 'common-base-classes';
import { WarehouseAggregate } from './warehouse.aggregate';

export interface WarehouseBuilder {
  withId(id: string): WarehouseBuilder;
  withName(name: string): WarehouseBuilder;
  withAddress(address: Record<string, number | string>): WarehouseBuilder;
  withProducts(products: string[]): WarehouseBuilder;
  withCordinates(coordinates: Record<string, number>): WarehouseBuilder;
  withCapacity(capacity: number): WarehouseBuilder;
  build(): WarehouseAggregate;
}

export class WarehouseAggregateBuilder implements WarehouseBuilder {
  private id?: WarehouseIdValueObject;
  private name?: WarehouseNameValueObject;
  private address?: WarehouseAddressValueObject;
  private cordinates?: WarehouseCordinatesValueObject;
  private products?: ProductIdValueObject[];
  private capacity?: WarehouseCapacityValueObject;

  withId(id: string): WarehouseBuilder {
    this.id = new WarehouseIdValueObject(id);
    return this;
  }
  withName(name: string): WarehouseBuilder {
    this.name = new WarehouseNameValueObject(name);
    return this;
  }
  withAddress(address: Record<string, string | number>): WarehouseBuilder {
    this.address = new WarehouseAddressValueObject({ 
      city: new CityValueObject()
    });
  }
  withProducts(products: string[]): WarehouseBuilder {
    throw new Error('Method not implemented.');
  }
  withCordinates(coordinates: Record<string, number>): WarehouseBuilder {
    throw new Error('Method not implemented.');
  }
  withCapacity(capacity: number): WarehouseBuilder {
    throw new Error('Method not implemented.');
  }

  build() {
    if (!this.id) {
      this.id = UUID.create();
    }

    if (!this.name) {
      throw new Error('Warehouse name is required');
    }

    if (!this.capacity) {
      throw new Error('Warehouse capacity is required');
    }

    if (!this.address && !this.cordinates) {
      throw new Error('Warehouse address or cordinates is required');
    }

    const warehouse = new WarehouseAggregate(this.id);

    warehouse.applyCreateWarehouse(
      new WarehouseCreatedDomainEvent({
        entityId: warehouse.id,
        details: {
          name: this.name,
          address: this.address,
          cordinates: this.cordinates,
          products: this.products || [],
          capacity: this.capacity,
        },
      }),
    );

    return warehouse;
  }
}
