import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  ProductInfoError,
  productInfoRepositoryDiToken,
  ProductInfoRepositoryPort,
} from '@views/products/product-info';
import { Err, Ok } from 'oxide.ts';
import {
  GetQualityOnHandQuery,
  GetQualityOnHandResponseDto,
  GetQualityOnHandResult,
} from './data';

@QueryHandler(GetQualityOnHandQuery)
export class GetQualityOnHandHandler
  implements IQueryHandler<GetQualityOnHandQuery, GetQualityOnHandResult>
{
  constructor(
    @Inject(productInfoRepositoryDiToken)
    private readonly productInfoRepository: ProductInfoRepositoryPort,
  ) {}

  async execute(query: GetQualityOnHandQuery): Promise<GetQualityOnHandResult> {
    const product = await this.productInfoRepository.getProductByName(
      query.name,
    );

    if (!product) {
      return Err(new ProductInfoError.NameIsNotExist());
    }

    return Ok(
      new GetQualityOnHandResponseDto({
        name: product.name,
        quantity: product.quantity,
      }),
    );
  }
}
