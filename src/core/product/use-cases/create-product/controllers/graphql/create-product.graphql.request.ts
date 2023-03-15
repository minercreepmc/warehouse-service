import { Field, InputType } from '@nestjs/graphql';
import { CreateProductRequest } from '../dtos';

@InputType()
export class CreateProductGraphQlRequest extends CreateProductRequest {
  @Field()
  name: string;
}
