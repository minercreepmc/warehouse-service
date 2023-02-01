import { Field, InputType } from '@nestjs/graphql';
import { ImportProductsRequest } from '../import-products.request';

@InputType()
export class ImportProductsGraphQlRequest implements ImportProductsRequest {
  @Field()
  name: string;
  @Field()
  quantity: number;
}
