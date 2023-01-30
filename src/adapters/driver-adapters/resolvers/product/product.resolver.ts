import { Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { match } from 'oxide.ts';
import { GetProductResponseDto } from '@driver-adapters/dtos/product/get-product';
import {
  GetProductsQuery,
  GetProductsResponse,
} from '@views/products/product-info/use-cases/get-products/data';
import { GetProductUseCaseError } from '@views/products/product-info/use-cases/get-product/data';

@Resolver(() => GetProductResponseDto)
export class ProductResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => [GetProductResponseDto], { name: 'products' })
  async getProducts() {
    const query = new GetProductsQuery();
    const result = await this.queryBus.execute(query);

    return match(result, {
      Ok: (products: GetProductsResponse) =>
        products.map((product) => new GetProductResponseDto(product)),
      Err: (error: GetProductUseCaseError) => {
        throw error;
      },
    });
  }
}
