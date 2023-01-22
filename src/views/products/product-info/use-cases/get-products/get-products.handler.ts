import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok } from 'oxide.ts';
import {
  productInfoRepositoryDiToken,
  ProductInfoRepositoryPort,
} from '../../product-info.repository.port';
import { GetProductsQuery, GetProductsResult } from './data';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler
  implements IQueryHandler<GetProductsQuery, GetProductsResult>
{
  constructor(
    @Inject(productInfoRepositoryDiToken)
    private readonly productInfoRepository: ProductInfoRepositoryPort,
  ) {}

  async execute(): Promise<any> {
    const products = await this.productInfoRepository.getProducts();
    return Ok(products);
  }
}
