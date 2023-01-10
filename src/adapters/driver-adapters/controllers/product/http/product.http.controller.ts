import {
  CreateProductRequestDto,
  GetQualityOnHandRequestDto,
  ImportProductsRequestDto,
  ShipProductsRequestDto,
} from '@driver-adapters/dtos/product';
import { AddProductThumbnailsRequestDto } from '@driver-adapters/dtos/product/add-product-thumbnails.request.dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import {
  CreateProductHttpController,
  GetQualityOnHandHttpController,
  ImportProductsHttpController,
  ShipProductsHttpController,
} from './sub-controllers';
import { AddProductThumbnailsHttpController } from './sub-controllers/add-product-thumbnail.http.controller';

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

  private readonly getQualityOnHandHttpController =
    new GetQualityOnHandHttpController(this.queryBus);

  private readonly addProductThumbnailsHttpController =
    new AddProductThumbnailsHttpController(this.commandBus);

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

  @Post('thumbnails')
  @ApiOperation({ summary: 'Add product thumbnails' })
  @ApiBody({
    required: true,
    description: 'The dto need to add product thumbnails',
    type: AddProductThumbnailsRequestDto,
  })
  async addProductThumbnails(@Body() dto: AddProductThumbnailsRequestDto) {
    return this.addProductThumbnailsHttpController.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get quality on hand' })
  async getQualityOnHand(@Query() dto: GetQualityOnHandRequestDto) {
    return this.getQualityOnHandHttpController.execute(dto);
  }
}
