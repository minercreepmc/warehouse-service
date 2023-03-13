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
import { ExportProductsCommand, ExportProductsResponseDto, ShipProductsUseCaseException } from '@product-use-case/ship-products/application-services/orchestrators/data';
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
    const command = new ExportProductsCommand(dto);
    const result = await this.commandBus.execute(command);

    return match(result, {
      Ok: (response: ExportProductsResponseDto) => response,
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
