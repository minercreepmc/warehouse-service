import {
  ProductBusinessError,
  ProductValidationError,
} from '@domain-errors/product';
import { Result } from 'oxide.ts';
import { GetQualityOnHandResponseDto } from './get-quality-on-hand.response.dto';

export type GetQualityOnHandUseCaseError =
  | ProductValidationError[]
  | ProductBusinessError[];

export type GetQualityOnHandResult = Result<
  GetQualityOnHandResponseDto,
  GetQualityOnHandUseCaseError
>;
