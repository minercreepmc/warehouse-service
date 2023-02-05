import { ApiProperty } from '@nestjs/swagger';
import { CreateProductCommand } from '../application-services/orchestrators/data';

export abstract class CreateProductRequest implements CreateProductCommand {
  @ApiProperty({
    example: 'Tomato',
  })
  name: string;
}
