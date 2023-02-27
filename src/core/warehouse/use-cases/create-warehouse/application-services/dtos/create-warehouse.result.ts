import { Result } from 'oxide.ts';
import { CreateWarehouseResponseDto } from './create-warehouse.response';
import { CreateWarehouseUseCaseError } from './create-warehouse.use-case.error';

export type CreateWarehouseResult = Result<
  CreateWarehouseResponseDto,
  CreateWarehouseUseCaseError
>;
