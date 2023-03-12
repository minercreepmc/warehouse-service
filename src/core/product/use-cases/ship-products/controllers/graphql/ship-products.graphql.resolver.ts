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
import { ShipProductsCommand, ShipProductsResponseDto, ShipProductsUseCaseException } from '@product-use-case/ship-products/application-services/orchestrators/data';
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
      Err: (errors: ShipProductsUseCaseException) => {
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
