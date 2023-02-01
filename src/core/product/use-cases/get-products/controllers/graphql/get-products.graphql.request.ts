import { InputType } from '@nestjs/graphql';
import { GetProductRequest } from '@product-use-case/get-product/controllers';

@InputType()
export class GetProductsGraphQlRequest extends GetProductRequest {}
