import { AbstractDomainError } from 'common-base-classes';
import { WarehouseDomainErrorCode } from './warehouse.domain-error-code';

export abstract class WarehouseValidationError extends AbstractDomainError {}
export abstract class WarehouseBusinessError extends AbstractDomainError {}

export namespace WarehouseDomainError {
  export class NameExists extends WarehouseBusinessError {
    readonly message = 'Warehosue name exists';
    readonly code = WarehouseDomainErrorCode.nameExists;
  }

  export class NameDoesNotValid extends WarehouseValidationError {
    readonly message = 'Warehosue name does not valid';
    readonly code = WarehouseDomainErrorCode.nameDoesNotValid;
  }

  export class LocationDoesNotValid extends WarehouseValidationError {
    readonly message = 'Warehosue location does not valid';
    readonly code = WarehouseDomainErrorCode.locationDoesNotValid;
  }
  export class CapacityDoesNotValid extends WarehouseValidationError {
    readonly message = 'Warehosue capacity does not valid';
    readonly code = WarehouseDomainErrorCode.capacityDoesNotValid;
  }
}
