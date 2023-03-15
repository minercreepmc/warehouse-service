import { Field, ObjectType } from '@nestjs/graphql';
import { ExportProductsResponse } from '../dtos';

interface ExportProductsGraphQlResponseOptions {
  name: string;
  quantity: number;
}

@ObjectType()
export class ExportProductsGraphQlResponse implements ExportProductsResponse {
  @Field(() => String)
  readonly message = 'Product exported successfully';
  @Field()
  name: string;
  @Field()
  quantity: number;

  constructor(data: ExportProductsGraphQlResponseOptions) {
    this.name = data.name;
    this.quantity = data.quantity;
  }
}
