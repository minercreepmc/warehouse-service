import { ProductInfoLogicError } from '@views/products/product-info/product-info.error';
import { Result } from 'oxide.ts';
import { GetProductResponse } from './get-product.response';

export type GetProductUseCaseError = ProductInfoLogicError;

export type GetProductResult = Result<
  GetProductResponse,
  GetProductUseCaseError
>;
