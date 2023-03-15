import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  ProductBusinessException,
  ProductValidationException,
} from '@product-domain-exceptions';
import {
  ExportProductsCommand,
  ExportProductsResponseDto,
  ExportProductsUseCaseExceptions,
} from '@product-use-case/export-products/application-services/dtos';
import { IsArrayContainInstanceOf } from 'common-base-classes';
import { match } from 'oxide.ts';
import { ExportProductsGraphQlRequest } from './export-products.graphql.request';
import { ExportProductsGraphQlResponse } from './export-products.graphql.response';

@Resolver()
export class ExportProductsGraphQlResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => ExportProductsGraphQlResponse, { name: 'exportProducts' })
  async execute(@Args('dto') args: ExportProductsGraphQlRequest) {
    const command = new ExportProductsCommand(args);
    const result = await this.commandBus.execute(command);

    return match(result, {
      Ok: (response: ExportProductsResponseDto) =>
        new ExportProductsGraphQlResponse(response),
      Err: (errors: ExportProductsUseCaseExceptions) => {
        if (IsArrayContainInstanceOf(errors, ProductValidationException)) {
          throw new UnprocessableEntityException(errors);
        }
        if (IsArrayContainInstanceOf(errors, ProductBusinessException)) {
          throw new ConflictException(errors);
        }

        throw errors;
      },
    });
  }
}
