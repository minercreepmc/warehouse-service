import {
  WarehouseBusinessError,
  WarehouseValidationError,
} from '@warehouse-domain-errors';

export type CreateWarehouseUseCaseError =
  | WarehouseValidationError[]
  | WarehouseBusinessError[];
