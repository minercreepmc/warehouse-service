import { Inject } from '@nestjs/common';
import {
  CreateWarehouseAggregate,
  WarehouseAggregate,
} from '@warehouse-aggregate/warehouse.aggregate';
import { WarehouseDomainError } from '@warehouse-domain-errors';
import { WarehouseCreatedDomainEvent } from '@warehouse-domain-events';
import {
  warehouseEventStoreDiToken,
  WarehouseEventStorePort,
  warehouseMessageBrokerDiToken,
  WarehouseMessageBrokerPort,
} from '@warehouse-gateway/driven-ports';
import { WarehouseNameValueObject } from '@warehouse-value-object/warehouse';
import { UUID } from 'common-base-classes';

export class WarehouseDomainService {
  constructor(
    @Inject(warehouseEventStoreDiToken)
    private readonly warehouseEventStore: WarehouseEventStorePort,

    @Inject(warehouseMessageBrokerDiToken)
    private readonly warehouseMessageBroker: WarehouseMessageBrokerPort,
  ) {}

  async createWarehouse(
    data: CreateWarehouseAggregate,
  ): Promise<WarehouseCreatedDomainEvent> {
    return this.warehouseEventStore.runInTransaction(async () => {
      if (await this.warehouseEventStore.isWarehouseNameExist(data.name)) {
        throw new WarehouseDomainError.NameExists();
      }

      const uuid = UUID.create();
      const warehouse = new WarehouseAggregate(uuid);
      const warehouseCreated = warehouse.createWarehouse(data);

      await this.warehouseEventStore.save(warehouseCreated);

      await this.sendMessageToMessageBroker(warehouseCreated);

      return warehouseCreated;
    });
  }

  private async sendMessageToMessageBroker(
    message: WarehouseCreatedDomainEvent,
  ) {
    return this.warehouseMessageBroker.emit(
      WarehouseCreatedDomainEvent.name,
      message,
    );
  }

  async isWarehouseExist(name: WarehouseNameValueObject) {
    return this.warehouseEventStore.isWarehouseNameExist(name);
  }
}
