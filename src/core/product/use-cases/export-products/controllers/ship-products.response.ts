import { ApiProperty } from '@nestjs/swagger';
import { ExportProductsResponseDto } from '../application-services/orchestrators/data';

export class ShipProductsResponse implements ExportProductsResponseDto {
  message: 'Product shipped successfully';

  @ApiProperty({
    example: 'Fish',
  })
  name: string;

  @ApiProperty({
    example: 100,
  })
  quantity: number;
}
