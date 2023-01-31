import {
  ProductInfoLogicError,
  ProductInfoModel,
  ProductInfoValidationError,
} from '@product-views/product-info';
import { Result } from 'oxide.ts';

export type GetProductsUseCaseError =
  | ProductInfoValidationError[]
  | ProductInfoLogicError[];

export type GetProductsResult = Result<
  ProductInfoModel[],
  GetProductsUseCaseError
>;
