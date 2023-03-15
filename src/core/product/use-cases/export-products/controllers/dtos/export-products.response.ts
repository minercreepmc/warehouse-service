import { ApiProperty } from '@nestjs/swagger';
import { ExportProductsResponseDto } from '@product-use-case/export-products/application-services/dtos';

export class ExportProductsResponse implements ExportProductsResponseDto {
  message: 'Product exported successfully';

  @ApiProperty({
    example: 'Fish',
  })
  name: string;

  @ApiProperty({
    example: 100,
  })
  quantity: number;
}
