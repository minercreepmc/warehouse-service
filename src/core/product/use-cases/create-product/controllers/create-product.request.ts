import { ApiProperty } from '@nestjs/swagger';
import { CreateProductCommand } from '../orchestrators/data';

export abstract class CreateProductRequest implements CreateProductCommand {
  @ApiProperty({
    example: 'Tomato',
  })
  name: string;
}
