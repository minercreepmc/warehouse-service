import {
  ProductBusinessError,
  ProductValidationError,
} from '@domain-errors/product';
import { Result } from 'oxide.ts';
import { ShipProductsResponseDto } from './ship-products.response.dto';

export type ShipProductsUseCaseError =
  | ProductValidationError[]
  | ProductBusinessError[];

export type ShipProductsResult = Result<
  ShipProductsResponseDto,
  ShipProductsUseCaseError
>;
