import { Field, ObjectType } from '@nestjs/graphql';
import { CreateProductResponse } from '../create-product.response';

@ObjectType()
export class CreateProductGraphQlResponse implements CreateProductResponse {
  @Field()
  name: string;

  constructor(data: CreateProductGraphQlResponse) {
    this.name = data.name;
  }
}
