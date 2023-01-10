import { ProductValidationError } from '@domain-errors/product';
import { AddProductThumbnailsRequestDto } from '@driver-adapters/dtos/product/add-product-thumbnails.request.dto';
import {
  AddProductThumbnailsCommand,
  AddProductThumbnailsResponseDto,
  AddProductThumbnailsUseCaseError,
} from '@driver-ports/use-cases/add-product-thumbnails/orchestrators/data';
import { UnprocessableEntityException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IsArrayContainInstanceOf } from 'common-base-classes';
import { match } from 'oxide.ts';

export class AddProductThumbnailsHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  async execute(dto: AddProductThumbnailsRequestDto) {
    const command = new AddProductThumbnailsCommand(dto);
    const result = await this.commandBus.execute(command);

    return match(result, {
      Ok: (response: AddProductThumbnailsResponseDto) => response,
      Err: (errors: AddProductThumbnailsUseCaseError) => {
        if (IsArrayContainInstanceOf(errors, ProductValidationError)) {
          throw new UnprocessableEntityException(errors);
        }
        throw errors;
      },
    });
  }
}
