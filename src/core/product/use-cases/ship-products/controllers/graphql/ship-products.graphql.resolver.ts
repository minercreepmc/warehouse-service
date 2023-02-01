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
  ShipProductsCommand,
  ShipProductsResponseDto,
  ShipProductsUseCaseError,
} from '@product-use-case/ship-products/orchestrators/data';
import { IsArrayContainInstanceOf } from 'common-base-classes';
import { match } from 'oxide.ts';
import { ShipProductsGraphQlRequest } from './ship-products.graphql.request';
import { ShipProductsGraphQlResponse } from './ship-products.graphql.response';

@Resolver()
export class ShipProductsGraphQlResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => ShipProductsGraphQlResponse, { name: 'shipProducts' })
  async execute(@Args('dto') args: ShipProductsGraphQlRequest) {
    const command = new ShipProductsCommand(args);
    const result = await this.commandBus.execute(command);

    return match(result, {
      Ok: (response: ShipProductsResponseDto) =>
        new ShipProductsGraphQlResponse(response),
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
