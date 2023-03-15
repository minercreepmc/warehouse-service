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
  ExportProductsCommand,
  ExportProductsResponseDto,
  ExportProductsUseCaseExceptions,
} from '@product-use-case/export-products/application-services/dtos';
import { IsArrayContainInstanceOf } from 'common-base-classes';
import { match } from 'oxide.ts';
import { ExportProductsHttpRequest } from './export-products.http.request';

@Controller('products')
export class ExportProductsHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('export')
  @ApiOperation({ summary: 'Export products' })
  @ApiBody({
    required: true,
    description: 'The dto need to export products',
    type: ExportProductsHttpRequest,
  })
  async execute(@Body() dto: ExportProductsHttpRequest) {
    const command = new ExportProductsCommand(dto);
    const result = await this.commandBus.execute(command);

    return match(result, {
      Ok: (response: ExportProductsResponseDto) => response,
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
