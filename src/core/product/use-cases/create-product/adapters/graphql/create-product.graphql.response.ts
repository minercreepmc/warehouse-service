import { Field, ObjectType } from '@nestjs/graphql';
import { CreateProductResponse } from '@product-use-case/create-product/orchestrators/data';

@ObjectType()
export class CreateProductGraphQlResponse implements CreateProductResponse {
  @Field()
  name: string;

  constructor(data: CreateProductGraphQlResponse) {
    this.name = data.name;
  }
}
