import { Field, InputType } from '@nestjs/graphql';
import { CreateProductCommand } from '@product-use-case/create-product/orchestrators/data';

@InputType()
export class CreateProductGraphQlRequest implements CreateProductCommand {
  @Field()
  name: string;
}
