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
  ProductBusinessException,
  ProductValidationException,
} from '@product-domain-exceptions';
import {
  CreateProductCommand,
  CreateProductResponseDto,
  CreateProductUseCaseException,
} from '@product-use-case/create-product/application-services/dtos';
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
