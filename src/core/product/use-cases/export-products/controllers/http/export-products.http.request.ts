import { ApiProperty } from '@nestjs/swagger';

export class ExportProductsHttpRequest {
  @ApiProperty({
    example: 'Banana',
    description: 'Product name to export',
  })
  readonly name: string;

  @ApiProperty({
    example: '10',
    description: 'The amount you want to export',
  })
  readonly quantity?: number;

  @ApiProperty({
    example: '10',
    description: 'The amount you want to postpone',
  })
  readonly postponed?: number;

  readonly isPostponed?: boolean;

  // @ApiProperty({
  //   example: 'kg',
  //   description: 'Unit of the product',
  //   enum: ['kg', 'g'],
  // })
  // readonly unit: string;
}
