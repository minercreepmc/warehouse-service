import { ApiProperty } from '@nestjs/swagger';
import { ExportProductsCommand } from '../application-services/orchestrators/data';

export class ShipProductsRequest implements ExportProductsCommand {
  @ApiProperty({
    example: 'Coconut',
  })
  name: string;

  @ApiProperty({
    example: 10,
  })
  quantity: number;
}
