import { ApiProperty } from '@nestjs/swagger';
import { ImportProductsCommand } from '../application-services/orchestrators/data';

export class ImportProductsRequest implements ImportProductsCommand {
  @ApiProperty({
    example: 'Chicken',
  })
  name: string;

  @ApiProperty({
    example: 12,
  })
  quantity: number;
}
