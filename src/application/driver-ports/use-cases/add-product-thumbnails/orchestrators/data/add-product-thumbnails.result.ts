import { ProductValidationError } from '@domain-errors/product';
import { Result } from 'oxide.ts';
import { AddProductThumbnailsResponseDto } from './add-product-thumbnails.response.dto';

export type AddProductThumbnailsUseCaseError = ProductValidationError[];
export type AddProductThumbnailsResult = Result<
  AddProductThumbnailsResponseDto,
  AddProductThumbnailsUseCaseError
>;
