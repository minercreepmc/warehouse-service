import { ApiProperty } from '@nestjs/swagger';
import { CreateProductResponse } from '@product-use-case/create-product/orchestrators/data';

export class CreateProductHttpResponse implements CreateProductResponse {
  @ApiProperty({
    example: 'Fish',
  })
  name: string;

  constructor(data: CreateProductHttpResponse) {
    this.name = data.name;
  }
}
