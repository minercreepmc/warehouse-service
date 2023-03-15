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
  ImportProductsCommand,
  ImportProductsResponseDto,
  ImportProductsUseCaseExceptions,
} from '@product-use-case/import-products/application-services/dtos';
import { IsArrayContainInstanceOf } from 'common-base-classes';
import { match } from 'oxide.ts';
import { ImportProductsHttpRequest } from './import-products.http.request';

@Controller('products')
export class ImportProductsHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('imports')
  @ApiOperation({ summary: 'Import products' })
  @ApiBody({
    required: true,
    description: 'The dto need to import products',
    type: ImportProductsHttpRequest,
  })
  async execute(@Body() dto: ImportProductsHttpRequest) {
    const command = new ImportProductsCommand(dto);
    const result = await this.commandBus.execute(command);
    return match(result, {
      Ok: (response: ImportProductsResponseDto) => response,
      Err: (errors: ImportProductsUseCaseExceptions) => {
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
