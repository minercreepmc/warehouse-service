import { ApiProperty } from '@nestjs/swagger';
import { GetProductQuery } from '@product-use-case/get-product/dtos';

export class GetProductRequest implements GetProductQuery {
  @ApiProperty({
    example: 'Chicken',
    description: 'Param to get quality on hand',
  })
  name: string;
}
