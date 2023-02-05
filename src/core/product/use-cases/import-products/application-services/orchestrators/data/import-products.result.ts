import { ProductValidationError } from '@product-domain-errors';
import { Result } from 'oxide.ts';
import { ImportProductsResponseDto } from './import-products.response.dto';

export type ImportProductsUseCaseError = ProductValidationError[];

export type ImportProductsResult = Result<
  ImportProductsResponseDto,
  ImportProductsUseCaseError
>;
