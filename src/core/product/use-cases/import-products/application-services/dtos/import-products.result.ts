import { ProductValidationException } from '@product-domain-exceptions';
import { Result } from 'oxide.ts';
import { ImportProductsResponseDto } from './import-products.response.dto';

export type ImportProductsUseCaseError = ProductValidationException[];

export type ImportProductsResult = Result<
  ImportProductsResponseDto,
  ImportProductsUseCaseError
>;
