import { WarehouseAggregate } from '@warehouse-aggregate';
import { WarehouseIdValueObject } from '@warehouse-value-object/warehouse';
import { DomainEvent, ID } from 'common-base-classes';
import { WarehouseCreatedDomainEventDetails } from './warehouse-created.domain-event';

export type WarehouseDomainEventDetails =
  Partial<WarehouseCreatedDomainEventDetails>;

export interface WarehouseDomainEventData {
  entityId: WarehouseIdValueObject;
  details: WarehouseDomainEventDetails;
  eventName: string;
}

export class WarehouseDomainEvent extends DomainEvent<WarehouseDomainEventDetails> {
  constructor({ entityId, details, eventName }: WarehouseDomainEventData) {
    super({
      entityId,
      details,
      eventName,
      entityType: WarehouseAggregate.name,
    });
  }
}
