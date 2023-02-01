import { Field, ObjectType } from '@nestjs/graphql';
import { ShipProductsResponse } from '../ship-products.response';

interface ShipProductsGraphQlResponseData {
  name: string;
  quantity: number;
}

@ObjectType()
export class ShipProductsGraphQlResponse implements ShipProductsResponse {
  @Field(() => String)
  readonly message = 'Product shipped successfully';
  @Field()
  name: string;
  @Field()
  quantity: number;

  constructor(data: ShipProductsGraphQlResponseData) {
    this.name = data.name;
    this.quantity = data.quantity;
  }
}
