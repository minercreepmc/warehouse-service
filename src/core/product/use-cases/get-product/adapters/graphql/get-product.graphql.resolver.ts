import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  GetProductQuery,
  GetProductUseCaseError,
} from '@product-use-case/get-product/data';
import { ProductInfoModel } from '@product-views/product-info';
import { match } from 'oxide.ts';
import { GetProductGraphQlInput } from './get-product.graphql.input';

@Resolver()
export class GetProductGraphQlResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => ProductInfoModel, { name: 'product', nullable: true })
  async getProduct(@Args('data') args: GetProductGraphQlInput) {
    const query = new GetProductQuery(args.name);

    const result = await this.queryBus.execute(query);

    return match(result, {
      Ok: (response: ProductInfoModel) => response,
      Err: (errors: GetProductUseCaseError) => {
        throw errors;
      },
    });
  }
}
