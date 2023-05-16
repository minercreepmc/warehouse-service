import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  productEventStoreDiToken,
  ProductEventStorePort,
} from '@product-gateway/driven-ports';
import { ProductNameValueObject } from '../../domain/value-objects/product-name.value-object';

export class GetProductAggregateDto {
  @ApiProperty({
    example: 'Tomato',
  })
  name: string;
}

@Controller('get-product-aggregate')
export class GetProductAggregateController {
  constructor(
    @Inject(productEventStoreDiToken)
    private readonly eventStore: ProductEventStorePort,
  ) {}

  @Post()
  async execute(@Body() dto: GetProductAggregateDto) {
    const product = await this.eventStore.getProduct(
      new ProductNameValueObject(dto.name),
    );
    const queueVisuallize = [];

    while (!product.loads.isEmpty()) {
      const load = product.loads.dequeue();
      queueVisuallize.unshift(load.quantity.unpack());
    }

    queueVisuallize.unshift('->');
    console.log(queueVisuallize);
  }
}
