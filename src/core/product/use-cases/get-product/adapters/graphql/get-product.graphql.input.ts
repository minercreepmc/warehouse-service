import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetProductGraphQlInput {
  @Field({ nullable: false })
  name: string;
}
