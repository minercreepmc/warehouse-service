import { IsNotEmpty, IsString } from 'class-validator';
import { AbstractReadModel } from 'common-base-classes';

export interface ProductInfoReadModelData {
  id: string;
  name: string;
  quantity?: number;
}

export class ProductInfoReadModel extends AbstractReadModel {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  quantity: number;

  constructor(data: ProductInfoReadModelData) {
    super({ id: data.id });
    this.name = data.name;
    this.quantity = data.quantity || 0;
  }
}
