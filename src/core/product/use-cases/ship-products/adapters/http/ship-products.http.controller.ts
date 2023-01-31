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
import {
  ShipProductsCommand,
  ShipProductsResponseDto,
  ShipProductsUseCaseError,
} from '@product-use-case/ship-products/orchestrators/data';
import { IsArrayContainInstanceOf } from 'common-base-classes';
import { match } from 'oxide.ts';
import { ShipProductsHttpRequest } from './ship-products.http.request';

@Controller('products')
export class ShipProductsHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('ship')
  @ApiOperation({ summary: 'Ship products' })
  @ApiBody({
    required: true,
    description: 'The dto need to ship products',
    type: ShipProductsHttpRequest,
  })
  async execute(@Body() dto: ShipProductsHttpRequest) {
    const command = new ShipProductsCommand(dto);
    const result = await this.commandBus.execute(command);

    return match(result, {
      Ok: (response: ShipProductsResponseDto) => response,
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
