import {
  ProductInfoLogicException,
  ProductInfoModel,
} from '@product-views/product-info';
import { Result } from 'oxide.ts';

export type GetProductUseCaseException = ProductInfoLogicException;

export type GetProductResult = Result<
  ProductInfoModel,
  GetProductUseCaseException
>;
