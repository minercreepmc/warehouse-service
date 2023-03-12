import {
  ProductBusinessException,
  ProductValidationException,
} from '@product-domain-exceptions';
import { Result } from 'oxide.ts';
import { CreateProductResponseDto } from './create-product.response.dto';

export type CreateProductUseCaseException =
  | ProductValidationException[]
  | ProductBusinessException[];

export type CreateProductResult = Result<
  CreateProductResponseDto,
  CreateProductUseCaseException
>;
