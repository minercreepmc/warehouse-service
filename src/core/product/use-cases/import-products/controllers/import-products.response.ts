import { ApiProperty } from '@nestjs/swagger';
import { ImportProductsResponseDto } from '../application-services/orchestrators/data';

export class ImportProductsResponse implements ImportProductsResponseDto {
  readonly message = 'Product imported successfully';

  @ApiProperty({
    example: 'Egg',
  })
  name: string;

  @ApiProperty({
    example: 100,
  })
  quantity: number;
}
