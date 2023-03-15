import { ApiProperty } from '@nestjs/swagger';
import { ExportProductsRequest } from '../dtos';

export class ExportProductsHttpRequest implements ExportProductsRequest {
  @ApiProperty({
    example: 'Banana',
    description: 'Product name to export',
  })
  readonly name: string;

  @ApiProperty({
    example: '10',
    description: 'The amount you want to export',
  })
  readonly quantity: number;

  // @ApiProperty({
  //   example: 'kg',
  //   description: 'Unit of the product',
  //   enum: ['kg', 'g'],
  // })
  // readonly unit: string;
}
