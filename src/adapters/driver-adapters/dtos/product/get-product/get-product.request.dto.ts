import { ApiProperty } from '@nestjs/swagger';
import { GetProductQuery } from '@views/products/product-info/use-cases/get-product/data';

export class GetProductRequestDto implements GetProductQuery {
  @ApiProperty({
    example: 'Chicken',
    description: 'Param to get quality on hand',
  })
  name: string;
}
