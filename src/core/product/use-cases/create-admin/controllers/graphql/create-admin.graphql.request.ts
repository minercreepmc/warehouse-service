import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAdminGraphQlRequest {
  @Field()
  username: string;
  @Field()
  password: string;
}
