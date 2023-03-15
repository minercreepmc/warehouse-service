import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateProductGraphQlResponse {
  @Field()
  name: string;

  constructor(data: CreateProductGraphQlResponse) {
    this.name = data.name;
  }
}
