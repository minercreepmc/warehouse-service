import {
  ProductBusinessError,
  ProductValidationError,
} from '@domain-errors/product';
import { ShipProductsRequestDto } from '@driver-adapters/dtos/product';
import {
  ShipProductsCommand,
  ShipProductsResponseDto,
  ShipProductsUseCaseError,
} from '@driver-ports/use-cases/ship-products/orchestrators/data';
import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IsArrayContainInstanceOf } from 'common-base-classes';
import { match } from 'oxide.ts';

export class ShipProductsHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  async execute(dto: ShipProductsRequestDto) {
    const command = new ShipProductsCommand(dto);
    const result = await this.commandBus.execute(command);

    return match(result, {
      Ok: (response: ShipProductsResponseDto) => response,
      Err: (errors: ShipProductsUseCaseError) => {
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
