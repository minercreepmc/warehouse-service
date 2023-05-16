import { ApiProperty } from '@nestjs/swagger';

export class ExportProductsRequest {
  @ApiProperty({
    example: 'Coconut',
  })
  name: string;

  @ApiProperty({
    example: 10,
  })
  quantity: number;

  @ApiProperty({
    example: 10,
  })
  postpone: number;
}
