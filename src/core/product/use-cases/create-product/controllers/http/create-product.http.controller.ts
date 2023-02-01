import {
  Body,
  ConflictException,
  Controller,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import {
  ProductBusinessError,
  ProductValidationError,
} from '@product-domain-errors';
import { CreateProductUseCaseError } from '@product-use-case/create-product';
import {
  CreateProductCommand,
  CreateProductResponseDto,
} from '@product-use-case/create-product/orchestrators/data';
import { IsArrayContainInstanceOf } from 'common-base-classes';
import { match } from 'oxide.ts';
import { CreateProductHttpRequest } from './create-product.http.request';
import { CreateProductHttpResponse } from './create-product.http.response';

@Controller('products')
export class CreateProductHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('create')
  @ApiOperation({ summary: 'Create product' })
  @ApiBody({
    required: true,
    description: 'The dto need to create product',
    type: CreateProductHttpRequest,
  })
  async execute(@Body() dto: CreateProductHttpRequest) {
    const command = new CreateProductCommand(dto);

    const result = await this.commandBus.execute(command);

    return match(result, {
      Ok: (response: CreateProductResponseDto) =>
        new CreateProductHttpResponse(response),
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
