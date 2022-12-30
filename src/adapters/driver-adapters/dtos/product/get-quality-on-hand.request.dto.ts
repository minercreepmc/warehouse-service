import { ApiProperty } from '@nestjs/swagger';

export class GetQualityOnHandRequestDto {
  @ApiProperty({
    example: 'Banana',
    description: 'Product name to get',
  })
  name: string;
}
