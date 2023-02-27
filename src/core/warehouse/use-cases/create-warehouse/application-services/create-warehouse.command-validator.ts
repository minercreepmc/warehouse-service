import { Injectable, PipeTransform } from '@nestjs/common';
import {
  WarehouseDomainError,
  WarehouseValidationError,
} from '@warehouse-domain-errors';
import {
  WarehouseLocationValueObject,
  WarehouseNameValueObject,
  WarehouseCapacityValueObject,
} from '@warehouse-value-object/warehouse';
import { AbstractNotificationWrapper } from 'common-base-classes';
import { Err } from 'oxide.ts';
import {
  CreateWarehouseCapacity,
  CreateWarehouseCommand,
  CreateWarehouseLocation,
} from './dtos';

@Injectable()
export class CreateWarehouseCommandValidator
  extends AbstractNotificationWrapper<WarehouseValidationError>
  implements PipeTransform
{
  transform(command: CreateWarehouseCommand) {
    this.validate(command);
    if (this.note.hasNote()) {
      return Err(this.errors);
    }
  }

  validate(command: CreateWarehouseCommand) {
    super.clearNote();
    this._validate(command);
  }

  _validate(command: CreateWarehouseCommand) {
    const { name, location, capacity } = command;
    this.checkWarehouseNameMustValid(name);
    this.checkWarehouseLocationMustValid(location);
    this.checkWarehouseCapacityMustValid(capacity);
  }

  private checkWarehouseNameMustValid(name: string) {
    if (!WarehouseNameValueObject.isValidFormat(name)) {
      this.note.addNote(new WarehouseDomainError.NameDoesNotValid());
    }
  }

  private checkWarehouseLocationMustValid(location: CreateWarehouseLocation) {
    if (!WarehouseLocationValueObject.isValidFormat(location)) {
      this.note.addNote(new WarehouseDomainError.LocationDoesNotValid());
    }
  }

  private checkWarehouseCapacityMustValid(capacity: CreateWarehouseCapacity) {
    if (!WarehouseCapacityValueObject.isValidFormat(capacity)) {
      this.note.addNote(new WarehouseDomainError.CapacityDoesNotValid());
    }
  }
}
