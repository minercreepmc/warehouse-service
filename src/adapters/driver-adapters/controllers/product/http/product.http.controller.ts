import {
  CreateProductRequestDto,
  ImportProductsRequestDto,
  ShipProductsRequestDto,
} from '@driver-adapters/dtos/product';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import {
  CreateProductHttpController,
  ImportProductsHttpController,
  ShipProductsHttpController,
} from './sub-controllers';

@Controller('products')
export class ProductHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  private readonly importProductsHttpController =
    new ImportProductsHttpController(this.commandBus);

  private readonly shipProductsHttpController = new ShipProductsHttpController(
    this.commandBus,
  );

  private readonly createProductHttpController =
    new CreateProductHttpController(this.commandBus);

  @Post('create')
  @ApiOperation({ summary: 'Create product' })
  @ApiParam({
    name: 'test',
    required: true,
    description: 'The dto need to create product',
    type: CreateProductRequestDto,
  })
  async createProduct(@Body() dto: CreateProductRequestDto) {
    return this.createProductHttpController.execute(dto);
  }

  @Post('imports')
  @ApiOperation({ summary: 'Import products' })
  @ApiParam({
    name: 'test',
    required: true,
    description: 'The dto need to import products',
    type: ImportProductsRequestDto,
  })
  async importProducts(@Body() dto: ImportProductsRequestDto) {
    return this.importProductsHttpController.execute(dto);
  }

  @Post('ship')
  @ApiOperation({ summary: 'Ship products' })
  @ApiParam({
    name: 'test',
    required: true,
    description: 'The dto need to ship products',
    type: ShipProductsRequestDto,
  })
  async shipProducts(@Body() dto: ShipProductsRequestDto) {
    return this.shipProductsHttpController.execute(dto);
  }
}
