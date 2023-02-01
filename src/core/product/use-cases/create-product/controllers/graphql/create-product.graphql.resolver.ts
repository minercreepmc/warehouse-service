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
import { CreateProductUseCaseError } from '@product-use-case/create-product/orchestrators';
import {
  CreateProductCommand,
  CreateProductResponseDto,
} from '@product-use-case/create-product/orchestrators/data';
import { IsArrayContainInstanceOf } from 'common-base-classes';
import { match } from 'oxide.ts';
import { CreateProductGraphQlRequest } from './create-product.graphql.request';
import { CreateProductGraphQlResponse } from './create-product.graphql.response';

@Resolver()
export class CreateProductGraphQlResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => CreateProductGraphQlResponse, { name: 'createProduct' })
  async execute(@Args('dto') args: CreateProductGraphQlRequest) {
    const command = new CreateProductCommand(args);

    const result = await this.commandBus.execute(command);
    return match(result, {
      Ok: (response: CreateProductResponseDto) =>
        new CreateProductGraphQlResponse(response),
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
