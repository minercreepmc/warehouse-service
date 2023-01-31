import { ConflictException, Controller, Get, Param } from '@nestjs/common';
import { IQueryBus } from '@nestjs/cqrs';
import { ApiOperation } from '@nestjs/swagger';
import {
  GetProductQuery,
  GetProductUseCaseError,
} from '@product-use-case/get-product/data';
import {
  ProductInfoLogicError,
  ProductInfoModel,
} from '@product-views/product-info';
import { match } from 'oxide.ts';
import { GetProductHttpRequest } from './get-product.http.request';

@Controller('products')
export class GetProductHttpController {
  constructor(private readonly queryBus: IQueryBus) {}

  @Get(':name')
  @ApiOperation({ summary: 'Get quality on hand' })
  async execute(@Param() param: GetProductHttpRequest) {
    const query = new GetProductQuery({ name: param.name });
    const result = await this.queryBus.execute(query);

    return match(result, {
      Ok: (response: ProductInfoModel) => response,
      Err: (error: GetProductUseCaseError) => {
        if (error instanceof ProductInfoLogicError) {
          throw new ConflictException(error);
        }
        throw error;
      },
    });
  }
}
