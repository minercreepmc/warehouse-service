import {
  Body,
  Controller,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { ProductValidationError } from '@product-domain-errors';
import {
  AddProductThumbnailsCommand,
  AddProductThumbnailsResponseDto,
  AddProductThumbnailsUseCaseError,
} from '@product-use-case/add-product-thumbnails/orchestrators/data';
import { IsArrayContainInstanceOf } from 'common-base-classes';
import { match } from 'oxide.ts';
import { AddProductThumbnailsHttpRequest } from './add-product-thumbnails.http.request';

@Controller()
export class AddProductThumbnailsHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('thumbnails')
  @ApiOperation({ summary: 'Add product thumbnails' })
  @ApiBody({
    required: true,
    description: 'The dto need to add product thumbnails',
    type: AddProductThumbnailsHttpRequest,
  })
  async execute(@Body() dto: AddProductThumbnailsHttpRequest) {
    const command = new AddProductThumbnailsCommand(dto);
    const result = await this.commandBus.execute(command);

    return match(result, {
      Ok: (response: AddProductThumbnailsResponseDto) => response,
      Err: (errors: AddProductThumbnailsUseCaseError) => {
        if (IsArrayContainInstanceOf(errors, ProductValidationError)) {
          throw new UnprocessableEntityException(errors);
        }
        throw errors;
      },
    });
  }
}
