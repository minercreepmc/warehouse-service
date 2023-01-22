import { ApiProperty } from '@nestjs/swagger';
import { GetQualityOnHandQuery } from '@views/products/product-info/use-cases/get-quality-on-hand/data';

export class GetQualityOnHandRequestDto implements GetQualityOnHandQuery {
  @ApiProperty({
    example: 'Chicken',
    description: 'Param to get quality on hand',
  })
  name: string;
}
