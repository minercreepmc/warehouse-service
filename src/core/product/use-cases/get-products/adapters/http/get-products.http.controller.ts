import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation } from '@nestjs/swagger';
import { GetProductsQuery } from '@product-use-case/get-products/data';
import { ProductInfoModel } from '@product-views/product-info';
import { match } from 'oxide.ts';
import { GetProductsHttpRequest } from './get-products.http.request';

@Controller('products')
export class GetProductsHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ summary: 'Get list of product' })
  async execute(@Query() dto: GetProductsHttpRequest) {
    const query = new GetProductsQuery(dto);
    const result = await this.queryBus.execute(query);
    return match(result, {
      Ok: (response: ProductInfoModel[]) => response,
      Err: (errors: Error) => {
        throw errors;
      },
    });
  }
}
