import { ApiProperty } from '@nestjs/swagger';
import { ImportProductsCommand } from '../orchestrators/data';

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
