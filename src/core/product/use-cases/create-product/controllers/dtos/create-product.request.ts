import { CreateProductCommand } from '@product-use-case/create-product/application-services/dtos';

export abstract class CreateProductRequest implements CreateProductCommand {
  name: string;
}
