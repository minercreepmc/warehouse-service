import {
  ProductBusinessError,
  ProductValidationError,
} from '@product-domain-errors';
import { Result } from 'oxide.ts';
import { ShipProductsResponseDto } from './ship-products.response.dto';

export type ShipProductsUseCaseError =
  | ProductValidationError[]
  | ProductBusinessError[];

export type ShipProductsResult = Result<
  ShipProductsResponseDto,
  ShipProductsUseCaseError
>;
