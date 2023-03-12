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
import { CreateProductUseCaseException } from '@product-use-case/create-product/application-services';
import {
  CreateProductCommand,
  CreateProductResponseDto,
} from '@product-use-case/create-product/application-services/orchestrators/data';
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
      Err: (errors: CreateProductUseCaseException) => {
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
