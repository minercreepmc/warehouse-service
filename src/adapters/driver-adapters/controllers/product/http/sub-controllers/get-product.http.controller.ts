import { GetProductResponseDto } from '@driver-adapters/dtos/product/get-product';
import { ConflictException } from '@nestjs/common';
import { IQueryBus } from '@nestjs/cqrs';
import { ProductInfoLogicError } from '@views/products/product-info';
import {
  GetProductQuery,
  GetProductResponse,
  GetProductUseCaseError,
} from '@views/products/product-info/use-cases/get-product/data';
import { match } from 'oxide.ts';

export class GetProductHttpController {
  constructor(private readonly queryBus: IQueryBus) {}
  async execute(dto: string) {
    const query = new GetProductQuery(dto);
    const result = await this.queryBus.execute(query);

    return match(result, {
      Ok: (response: GetProductResponse) => new GetProductResponseDto(response),
      Err: (error: GetProductUseCaseError) => {
        if (error instanceof ProductInfoLogicError) {
          throw new ConflictException(error);
        }
        throw error;
      },
    });
  }
}
