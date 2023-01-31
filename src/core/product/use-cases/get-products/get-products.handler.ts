import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  productInfoRepositoryDiToken,
  ProductInfoRepositoryPort,
} from '@product-views/product-info';
import { Ok } from 'oxide.ts';
import { GetProductsQuery, GetProductsResult } from './data';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler
  implements IQueryHandler<GetProductsQuery, GetProductsResult>
{
  constructor(
    @Inject(productInfoRepositoryDiToken)
    private readonly productInfoRepository: ProductInfoRepositoryPort,
  ) {}

  async execute(): Promise<GetProductsResult> {
    const products = await this.productInfoRepository.getProducts();
    return Ok(products);
  }
}
