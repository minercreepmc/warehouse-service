import { Field, InputType } from '@nestjs/graphql';
import { GetProductRequest } from '../get-product.request';

@InputType()
export class GetProductGraphQlRequest extends GetProductRequest {
  @Field({ nullable: false })
  name: string;
}
