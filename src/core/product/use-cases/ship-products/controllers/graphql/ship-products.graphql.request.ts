import { Field, InputType } from '@nestjs/graphql';
import { ShipProductsRequest } from '../ship-products.request';

@InputType()
export class ShipProductsGraphQlRequest implements ShipProductsRequest {
  @Field()
  name: string;

  @Field()
  quantity: number;
}
