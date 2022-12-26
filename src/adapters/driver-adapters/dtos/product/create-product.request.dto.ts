import { CreateProductCommand } from '@driver-ports/use-cases/create-product/orchestration/data';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductRequestDto implements CreateProductCommand {
  @ApiProperty({
    example: 'Chicken',
    description: 'Product name to create',
  })
  readonly name: string;
}
