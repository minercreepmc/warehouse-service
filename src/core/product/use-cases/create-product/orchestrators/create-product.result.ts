import {
  ProductBusinessError,
  ProductValidationError,
} from '@product-domain-errors';
import { Result } from 'oxide.ts';
import { CreateProductResponse } from './data';

export type CreateProductUseCaseError =
  | ProductValidationError[]
  | ProductBusinessError[];

export type CreateProductResult = Result<
  CreateProductResponse,
  CreateProductUseCaseError
>;
