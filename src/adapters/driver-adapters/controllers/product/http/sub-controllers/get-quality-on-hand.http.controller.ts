import {
  ProductBusinessError,
  ProductValidationError,
} from '@domain-errors/product';
import { GetQualityOnHandRequestDto } from '@driver-adapters/dtos/product';
import {
  GetQualityOnHandQuery,
  GetQualityOnHandResponseDto,
  GetQualityOnHandUseCaseError,
} from '@driver-ports/use-cases/get-quality-on-hand/orchestrators/data';
import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IQueryBus } from '@nestjs/cqrs';
import { IsArrayContainInstanceOf } from 'common-base-classes';
import { match } from 'oxide.ts';

export class GetQualityOnHandHttpController {
  constructor(private readonly queryBus: IQueryBus) {}
  async execute(dto: GetQualityOnHandRequestDto) {
    const query = new GetQualityOnHandQuery(dto.name);
    const result = await this.queryBus.execute(query);

    return match(result, {
      Ok: (response: GetQualityOnHandResponseDto) => response,
      Err: (errors: GetQualityOnHandUseCaseError) => {
        if (IsArrayContainInstanceOf(errors, ProductValidationError)) {
          throw new UnprocessableEntityException(errors);
        }

        if (IsArrayContainInstanceOf(errors, ProductBusinessError)) {
          throw new ConflictException(errors);
        }
        throw errors;
      },
    });
  }
}
