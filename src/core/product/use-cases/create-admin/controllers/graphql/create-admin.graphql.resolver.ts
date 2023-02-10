import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Mutation, Resolver } from '@nestjs/graphql';
import {
  AdminValidationError,
  ProductBusinessError,
} from '@product-domain-errors';
import {
  CreateAdminCommand,
  CreateAdminResponseDto,
  CreateAdminUseCaseError,
} from '@product-use-case/create-admin/application-services/orchestrators/data';
import { IsArrayContainInstanceOf } from 'common-base-classes';
import { match } from 'oxide.ts';
import { CreateAdminGraphQlRequest } from './create-admin.graphql.request';
import { CreateAdminGraphQlResponse } from './create-admin.graphql.response';

@Resolver()
export class CreateAdminGraphQlResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => CreateAdminGraphQlResponse, { name: 'createAdmin' })
  async execute(dto: CreateAdminGraphQlRequest) {
    const command = new CreateAdminCommand(dto);

    const result = await this.commandBus.execute(command);
    return match(result, {
      Ok: (response: CreateAdminResponseDto) =>
        new CreateAdminGraphQlResponse(response),
      Err: (errors: CreateAdminUseCaseError) => {
        if (IsArrayContainInstanceOf(errors, AdminValidationError)) {
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
