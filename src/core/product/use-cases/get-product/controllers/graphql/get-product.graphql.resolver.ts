import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  GetProductQuery,
  GetProductUseCaseException,
} from '@product-use-case/get-product/dtos';
import { ProductInfoModel } from '@product-views/product-info';
import { match } from 'oxide.ts';
import { GetProductResponse } from '../dtos';
import { GetProductGraphQlRequest } from './get-product.graphql.request';

@Resolver()
export class GetProductGraphQlResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => ProductInfoModel, { name: 'product', nullable: true })
  async getProduct(@Args('data') args: GetProductGraphQlRequest) {
    const query = new GetProductQuery(args.name);

    const result = await this.queryBus.execute(query);

    return match(result, {
      Ok: (response: GetProductResponse) => new ProductInfoModel(response),
      Err: (errors: GetProductUseCaseException) => {
        throw errors;
      },
    });
  }
}
