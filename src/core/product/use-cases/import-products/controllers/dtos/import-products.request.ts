import { ApiProperty } from '@nestjs/swagger';
import { ImportProductsCommand } from '@product-use-case/import-products/application-services/dtos';

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
