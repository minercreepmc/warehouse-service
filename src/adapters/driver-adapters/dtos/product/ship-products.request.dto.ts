import { ApiProperty } from '@nestjs/swagger';

export class ShipProductsRequestDto {
  @ApiProperty({
    example: 'Banana',
    description: 'Product name to ship',
  })
  readonly name: string;

  @ApiProperty({
    example: '10',
    description: 'The amount you want to ship',
  })
  readonly quantity: number;

  @ApiProperty({
    example: 'kg',
    description: 'Unit of the product',
    enum: ['kg', 'g'],
  })
  readonly unit: string;
}
