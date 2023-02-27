import { Injectable } from '@nestjs/common';
import {
  WarehouseBusinessError,
  WarehouseDomainError,
} from '@warehouse-domain-errors';
import { WarehouseDomainService } from '@warehouse-domain-services';
import { WarehouseNameValueObject } from '@warehouse-value-object/warehouse';
import { AbstractNotificationWrapper } from 'common-base-classes';
import { CreateWarehouseDomainData } from './dtos/create-warehouse.domain-data';

@Injectable()
export class CreateWarehouseBusinessValidator extends AbstractNotificationWrapper<WarehouseBusinessError> {
  constructor(private readonly domainService: WarehouseDomainService) {
    super();
  }

  async validate(domainData: CreateWarehouseDomainData): Promise<void> {
    super.clearNote();
    return this._validate(domainData);
  }

  private async _validate(domainData: CreateWarehouseDomainData) {
    await this.warehouseMustNotExist(domainData.name);
  }

  private async warehouseMustNotExist(name: WarehouseNameValueObject) {
    if (await this.domainService.isWarehouseExist(name)) {
      this.note.addNote(new WarehouseDomainError.NameExists());
    }
  }
}
