import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateAdminGraphQlResponse {
  @Field()
  username: string;

  constructor(dto: CreateAdminGraphQlResponse) {
    this.username = dto.username;
  }
}
