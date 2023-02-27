import { WarehouseDomainEvent } from '@warehouse-domain-events';
import { WarehouseNameValueObject } from '@warehouse-value-object/warehouse';
import { EventStorePort, RepositoryPort } from 'common-base-classes';

export interface WarehouseEventStorePort
  extends EventStorePort<WarehouseDomainEvent> {
  isWarehouseNameExist(name: WarehouseNameValueObject): Promise<boolean>;
}

export const warehouseEventStoreDiToken = Symbol('WAREHOUSE_EVENT_STORE');
