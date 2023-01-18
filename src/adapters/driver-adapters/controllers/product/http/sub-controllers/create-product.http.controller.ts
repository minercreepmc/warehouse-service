import {
  ProductBusinessError,
  ProductValidationError,
} from '@domain-errors/product';
import { CreateProductRequestDto } from '@driver-adapters/dtos/product';
import { CreateProductUseCaseError } from '@driver-ports/use-cases';
import {
  CreateProductCommand,
  CreateProductResponseDto,
} from '@driver-ports/use-cases/create-product/orchestrators/data';
import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IsArrayContainInstanceOf } from 'common-base-classes';
import { match } from 'oxide.ts';

export class CreateProductHttpController {
  constructor(private readonly commandBus: CommandBus) {}
  async execute(dto: CreateProductRequestDto) {
    const command = new CreateProductCommand(dto);

    const result = await this.commandBus.execute(command);

    return match(result, {
      Ok: (response: CreateProductResponseDto) => response,
      Err: (errors: CreateProductUseCaseError) => {
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
