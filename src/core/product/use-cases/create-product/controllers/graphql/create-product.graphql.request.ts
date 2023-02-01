import { Field, InputType } from '@nestjs/graphql';
import { CreateProductRequest } from '../create-product.request';

@InputType()
export class CreateProductGraphQlRequest extends CreateProductRequest {
  @Field()
  name: string;
}
