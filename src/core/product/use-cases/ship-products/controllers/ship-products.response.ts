import { ApiProperty } from '@nestjs/swagger';
import { ShipProductsResponseDto } from '../orchestrators/data';

export class ShipProductsResponse implements ShipProductsResponseDto {
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
