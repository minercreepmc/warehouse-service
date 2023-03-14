import { Field, InputType } from '@nestjs/graphql';
import { ExportProductsRequest } from '../dtos';

@InputType()
export class ExportProductsGraphQlRequest implements ExportProductsRequest {
  @Field()
  name: string;

  @Field()
  quantity: number;
}
