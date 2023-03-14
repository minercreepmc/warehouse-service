import { Field, ObjectType } from '@nestjs/graphql';
import { ImportProductsResponse } from '../dtos';

@ObjectType()
export class ImportProductsGraphQlResponse implements ImportProductsResponse {
  @Field()
  message: 'Product imported successfully';

  @Field()
  name: string;

  @Field()
  quantity: number;
  constructor(data: ImportProductsGraphQlResponse) {
    this.name = data.name;
    this.quantity = data.quantity;
  }
}
