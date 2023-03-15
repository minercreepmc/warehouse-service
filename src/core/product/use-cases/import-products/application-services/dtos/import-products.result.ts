import { ProductValidationException } from '@product-domain-exceptions';
import { Result } from 'oxide.ts';
import { ImportProductsResponseDto } from './import-products.response.dto';

export type ImportProductsUseCaseExceptions = ProductValidationException[];

export type ImportProductsResult = Result<
  ImportProductsResponseDto,
  ImportProductsUseCaseExceptions
>;
