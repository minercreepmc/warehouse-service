import {
  ProductBusinessError,
  ProductValidationError,
} from '@domain-errors/product';
import { Result } from 'oxide.ts';
import { CreateProductResponseDto } from './data';

export type CreateProductUseCaseError =
  | ProductValidationError[]
  | ProductBusinessError[];

export type CreateProductResult = Result<
  CreateProductResponseDto,
  CreateProductUseCaseError
>;
