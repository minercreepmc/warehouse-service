import {
  CreateProductRequestDto,
  GetQualityOnHandRequestDto,
  ImportProductsRequestDto,
  ShipProductsRequestDto,
} from '@driver-adapters/dtos/product';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import {
  CreateProductHttpController,
  GetQualityOnHandHttpController,
  ImportProductsHttpController,
  ShipProductsHttpController,
} from './sub-controllers';

@Controller('products')
export class ProductHttpController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  private readonly importProductsHttpController =
    new ImportProductsHttpController(this.commandBus);

  private readonly shipProductsHttpController = new ShipProductsHttpController(
    this.commandBus,
  );

  private readonly createProductHttpController =
    new CreateProductHttpController(this.commandBus);

  private readonly getQualityOnHandHtppController =
    new GetQualityOnHandHttpController(this.queryBus);

  @Post('create')
  @ApiOperation({ summary: 'Create product' })
  @ApiBody({
    required: true,
    description: 'The dto need to create product',
    type: CreateProductRequestDto,
  })
  async createProduct(@Body() dto: CreateProductRequestDto) {
    return this.createProductHttpController.execute(dto);
  }

  @Post('imports')
  @ApiOperation({ summary: 'Import products' })
  @ApiBody({
    required: true,
    description: 'The dto need to import products',
    type: ImportProductsRequestDto,
  })
  async importProducts(@Body() dto: ImportProductsRequestDto) {
    return this.importProductsHttpController.execute(dto);
  }

  @Post('ship')
  @ApiOperation({ summary: 'Ship products' })
  @ApiBody({
    required: true,
    description: 'The dto need to ship products',
    type: ShipProductsRequestDto,
  })
  async shipProducts(@Body() dto: ShipProductsRequestDto) {
    return this.shipProductsHttpController.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get quality on hand' })
  async getQualityOnHand(@Query() dto: GetQualityOnHandRequestDto) {
    return this.getQualityOnHandHtppController.execute(dto);
  }
}
