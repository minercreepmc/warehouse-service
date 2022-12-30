import {
  ProductBusinessError,
  ProductValidationError,
} from '@domain-errors/product';
import { ImportProductsRequestDto } from '@driver-adapters/dtos/product';
import {
  ImportProductsCommand,
  ImportProductsResponseDto,
  ImportProductsUseCaseError,
} from '@driver-ports/use-cases/import-products/orchestrators/data';
import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IsArrayContainInstanceOf } from 'common-base-classes';
import { match } from 'oxide.ts';

export class ImportProductsHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  async execute(dto: ImportProductsRequestDto) {
    const command = new ImportProductsCommand(dto);
    const result = await this.commandBus.execute(command);
    return match(result, {
      Ok: (response: ImportProductsResponseDto) => response,
      Err: (errors: ImportProductsUseCaseError) => {
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
