import { Ok } from 'oxide.ts';
import { GetProductsResponseDto } from './get-products.response.dto';

export type GetProductsResult = Ok<GetProductsResponseDto>;
