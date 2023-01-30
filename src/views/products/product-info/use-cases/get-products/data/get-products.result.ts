import {
  ProductInfoLogicError,
  ProductInfoValidationError,
} from '@views/products/product-info/product-info.error';
import { Result } from 'oxide.ts';
import { GetProductsResponse } from './get-products.response';

export type GetProductsUseCaseError =
  | ProductInfoValidationError[]
  | ProductInfoLogicError[];

export type GetProductsResult = Result<
  GetProductsResponse,
  GetProductsUseCaseError
>;
