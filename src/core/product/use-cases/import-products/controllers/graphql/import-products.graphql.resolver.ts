import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  ProductBusinessError,
  ProductValidationError,
} from '@product-domain-errors';
import {
  ImportProductsCommand,
  ImportProductsResponseDto,
  ImportProductsUseCaseError,
} from '@product-use-case/import-products/application-services/orchestrators/data';
import { IsArrayContainInstanceOf } from 'common-base-classes';
import { match } from 'oxide.ts';
import { ImportProductsGraphQlRequest } from './import-products.graphql.request';
import { ImportProductsGraphQlResponse } from './import-products.graphql.response';

@Resolver()
export class ImportProductsGraphQlResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => ImportProductsGraphQlResponse, {
    name: 'importProducts',
  })
  async execute(@Args('dto') args: ImportProductsGraphQlRequest) {
    const command = new ImportProductsCommand(args);

    const result = await this.commandBus.execute(command);

    return match(result, {
      Ok: (response: ImportProductsResponseDto) =>
        new ImportProductsGraphQlResponse(response),
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
