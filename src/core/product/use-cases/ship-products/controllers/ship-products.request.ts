import { ApiProperty } from '@nestjs/swagger';
import { ShipProductsCommand } from '../orchestrators/data';

export class ShipProductsRequest implements ShipProductsCommand {
  @ApiProperty({
    example: 'Coconut'
  })
  name: string;

  @ApiProperty({
    example: 10
  })
  quantity: number;
}
