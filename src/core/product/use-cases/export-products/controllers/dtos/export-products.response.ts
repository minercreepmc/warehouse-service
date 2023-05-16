import { ApiProperty } from '@nestjs/swagger';

export class ExportProductsResponse {
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
