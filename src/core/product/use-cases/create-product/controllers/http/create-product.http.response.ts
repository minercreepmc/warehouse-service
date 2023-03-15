import { ApiProperty } from '@nestjs/swagger';
import { CreateProductResponseDto } from '@product-use-case/create-product/application-services/dtos';

export class CreateProductHttpResponse implements CreateProductResponseDto {
  @ApiProperty({
    example: 'Fish',
  })
  name: string;

  constructor(data: CreateProductHttpResponse) {
    this.name = data.name;
  }
}
