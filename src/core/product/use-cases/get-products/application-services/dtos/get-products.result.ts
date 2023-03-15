import {
  ProductInfoLogicException,
  ProductInfoModel,
  ProductInfoValidationException,
} from '@product-views/product-info';
import { Result } from 'oxide.ts';

export type GetProductsUseCaseException =
  | ProductInfoValidationException[]
  | ProductInfoLogicException[];

export type GetProductsResult = Result<
  ProductInfoModel[],
  GetProductsUseCaseException
>;
