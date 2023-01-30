import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { GetProductResponse } from '@views/products/product-info/use-cases/get-product/data';

@ObjectType()
export class GetProductResponseDto implements GetProductResponse {
  @ApiProperty({
    example: 'Banana',
  })
  @Field()
  name: string;

  @ApiProperty({
    example: 15,
  })
  @Field()
  quantity: number;

  constructor(data: GetProductResponseDto) {
    this.name = data.name;
    this.quantity = data.quantity;
  }
}
