import { GetQualityOnHandRequestDto } from '@driver-adapters/dtos/product';
import { ConflictException } from '@nestjs/common';
import { IQueryBus } from '@nestjs/cqrs';
import { ProductInfoLogicError } from '@views/products/product-info';
import {
  GetQualityOnHandQuery,
  GetQualityOnHandResponseDto,
  GetQualityOnHandUseCaseError,
} from '@views/products/product-info/use-cases/get-quality-on-hand/data';
import { match } from 'oxide.ts';

export class GetQualityOnHandHttpController {
  constructor(private readonly queryBus: IQueryBus) {}
  async execute(dto: GetQualityOnHandRequestDto) {
    const query = new GetQualityOnHandQuery(dto.name);
    const result = await this.queryBus.execute(query);

    return match(result, {
      Ok: (response: GetQualityOnHandResponseDto) => response,
      Err: (error: GetQualityOnHandUseCaseError) => {
        if (error instanceof ProductInfoLogicError) {
          throw new ConflictException(error);
        }
        throw error;
      },
    });
  }
}
