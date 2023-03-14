import { ApiProperty } from '@nestjs/swagger';
import { CreateProductRequest } from '../dtos';

export class CreateProductHttpRequest extends CreateProductRequest {
  @ApiProperty({
    example: 'Tomato',
  })
  name: string;
}
