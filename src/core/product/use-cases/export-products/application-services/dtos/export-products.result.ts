import {
  ProductBusinessException,
  ProductValidationException,
} from '@product-domain-exceptions';
import { Result } from 'oxide.ts';
import { ExportProductsResponseDto } from './export-products.response.dto';

export type ExportProductsUseCaseExceptions =
  | ProductValidationException[]
  | ProductBusinessException[];

export type ExportProductsResult = Result<
  ExportProductsResponseDto,
  ExportProductsUseCaseExceptions
>;
