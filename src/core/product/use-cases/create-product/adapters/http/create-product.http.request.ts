import { ApiProperty } from '@nestjs/swagger';
import { CreateProductCommand } from '@product-use-case/create-product/orchestrators/data';

export class CreateProductHttpRequest implements CreateProductCommand {
  @ApiProperty({
    example: 'Chicken',
    description: 'Product name to create',
  })
  readonly name: string;
}
