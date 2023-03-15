import { ApiProperty } from '@nestjs/swagger';
import { ExportProductsCommand } from '@product-use-case/export-products/application-services/dtos';

export class ExportProductsRequest implements ExportProductsCommand {
  @ApiProperty({
    example: 'Coconut',
  })
  name: string;

  @ApiProperty({
    example: 10,
  })
  quantity: number;
}
