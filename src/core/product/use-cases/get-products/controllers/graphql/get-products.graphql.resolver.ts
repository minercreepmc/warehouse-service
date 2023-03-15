import { Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { match } from 'oxide.ts';
import { ProductInfoModel } from '@product-views/product-info';
import {
  GetProductsQuery,
  GetProductsUseCaseException,
} from '@product-use-case/get-products/application-services/dtos';

@Resolver()
export class GetProductsGraphQlResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => [ProductInfoModel], { name: 'products' })
  async getProducts() {
    const query = new GetProductsQuery();
    const result = await this.queryBus.execute(query);

    return match(result, {
      Ok: (products: ProductInfoModel[]) => products,
      Err: (exception: GetProductsUseCaseException) => {
        throw exception;
      },
    });
  }
}
