import { GetProductsRequestDto } from '@driver-adapters/dtos/product';
import { IQueryBus } from '@nestjs/cqrs';
import {
  GetProductsQuery,
  GetProductsResponseDto,
} from '@views/products/product-info/use-cases/get-products/data';
import { match } from 'oxide.ts';

export class GetProductsHttpController {
  constructor(private readonly queryBus: IQueryBus) {}

  async execute(dto: GetProductsRequestDto) {
    const query = new GetProductsQuery(dto);
    const result = await this.queryBus.execute(query);
    return match(result, {
      Ok: (response: GetProductsResponseDto) => response,
      Err: (errors: Error) => {
        throw errors;
      },
    });
  }
}
