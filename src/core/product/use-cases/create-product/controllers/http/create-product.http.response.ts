import { ApiProperty } from '@nestjs/swagger';
import { CreateProductResponse } from '../create-product.response';

export class CreateProductHttpResponse implements CreateProductResponse {
  @ApiProperty({
    example: 'Fish',
  })
  name: string;

  constructor(data: CreateProductHttpResponse) {
    this.name = data.name;
  }
}
