import {
  ProductInfoLogicError,
  ProductInfoModel,
} from '@product-views/product-info';
import { Result } from 'oxide.ts';

export type GetProductUseCaseError = ProductInfoLogicError;

export type GetProductResult = Result<ProductInfoModel, GetProductUseCaseError>;
