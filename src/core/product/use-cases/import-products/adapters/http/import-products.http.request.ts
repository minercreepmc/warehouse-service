import { ApiProperty } from '@nestjs/swagger';

export class ImportProductsHttpRequest {
  @ApiProperty({
    example: 'Tomato',
    description: 'Product name',
  })
  readonly name: string;
  @ApiProperty({
    example: '10',
    description: 'Product quantity',
  })
  readonly quantity: number;

  // @ApiProperty({
  //   example: 'kg',
  //   description: 'Unit of the product',
  //   enum: ['kg', 'g'],
  // })
  // readonly unit: string;
}
