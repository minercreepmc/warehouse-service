import { Field, InputType } from '@nestjs/graphql';
import { GetProductRequest } from '../dtos';

@InputType()
export class GetProductGraphQlRequest extends GetProductRequest {
  @Field({ nullable: false })
  name: string;
}
