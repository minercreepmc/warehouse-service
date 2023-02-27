import { ProductIdValueObject } from '@product-value-object';
import { WarehouseAggregate } from '@warehouse-aggregate/warehouse.aggregate';
import {
  WarehouseAddressValueObject,
  WarehouseCordinatesValueObject,
  WarehouseIdValueObject,
  WarehouseNameValueObject,
} from '@warehouse-value-object/warehouse';
import { WarehouseCapacityValueObject } from '@warehouse-value-object/warehouse/warehouse-capacity.value-object';
import { DomainEvent } from 'common-base-classes';

/**
 * Represents the details of the WarehouseCreatedDomainEvent.
 */
export interface WarehouseCreatedDomainEventDetails {
  name: WarehouseNameValueObject;
  address: WarehouseAddressValueObject;
  cordinates?: WarehouseCordinatesValueObject;
  products: ProductIdValueObject[];
  capacity: WarehouseCapacityValueObject;
}

/**
 * Represents the data of the WarehouseCreatedDomainEvent.
 */
export interface WarehouseCreatedDomainEventData {
  /**
   * The ID of the warehouse entity.
   */
  entityId: WarehouseIdValueObject;
  /**
   * The details of the WarehouseCreatedDomainEvent.
   */
  details: WarehouseCreatedDomainEventDetails;
}

/**
 * Represents the WarehouseCreatedDomainEvent.
 *
 * @extends {DomainEvent}
 */
export class WarehouseCreatedDomainEvent extends DomainEvent<WarehouseCreatedDomainEventDetails> {
  /**
   * Creates a new instance of the WarehouseCreatedDomainEvent.
   *
   * @param data The data of the WarehouseCreatedDomainEvent.
   */
  constructor({ entityId, details }: WarehouseCreatedDomainEventData) {
    super({
      eventName: WarehouseCreatedDomainEvent.name,
      entityType: WarehouseAggregate.name,
      entityId,
      details,
    });
  }
}
