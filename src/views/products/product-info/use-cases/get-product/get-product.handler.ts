import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  ProductInfoError,
  productInfoRepositoryDiToken,
  ProductInfoRepositoryPort,
} from '@views/products/product-info';
import { Err, Ok } from 'oxide.ts';
import { GetProductResponse, GetProductResult, GetProductQuery } from './data';

@QueryHandler(GetProductQuery)
export class GetProductHandler
  implements IQueryHandler<GetProductQuery, GetProductResult>
{
  constructor(
    @Inject(productInfoRepositoryDiToken)
    private readonly productInfoRepository: ProductInfoRepositoryPort,
  ) {}

  async execute(query: GetProductQuery): Promise<GetProductResult> {
    const product = await this.productInfoRepository.getProductByName(
      query.name,
    );

    if (!product) {
      return Err(new ProductInfoError.NameIsNotExist());
    }

    return Ok(
      new GetProductResponse({
        name: product.name,
        quantity: product.quantity,
      }),
    );
  }
}
