import { ApiProperty } from '@nestjs/swagger';
import { ImportProductsResponseDto } from '@product-use-case/import-products/application-services/dtos';

export class ImportProductsResponse implements ImportProductsResponseDto {
  readonly message = 'Product imported successfully';

  @ApiProperty({
    example: 'Egg',
  })
  name: string;

  @ApiProperty({
    example: 100,
  })
  quantity: number;
}
