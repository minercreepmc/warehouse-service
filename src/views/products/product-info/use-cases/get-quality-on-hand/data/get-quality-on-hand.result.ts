import { ProductInfoLogicError } from '@views/products/product-info/product-info.error';
import { Result } from 'oxide.ts';
import { GetQualityOnHandResponseDto } from './get-quality-on-hand.response.dto';

export type GetQualityOnHandUseCaseError = ProductInfoLogicError;

export type GetQualityOnHandResult = Result<
  GetQualityOnHandResponseDto,
  GetQualityOnHandUseCaseError
>;
