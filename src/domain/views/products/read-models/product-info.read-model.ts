import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AbstractReadModel } from 'common-base-classes';

export interface ProductInfoReadModelData {
  productId: string;
  name: string;
  quantity: number;
  unit?: string;
}

export class ProductInfoReadModel extends AbstractReadModel {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  readonly quantity: number;

  readonly unit?: string;
  constructor(data: ProductInfoReadModelData) {
    super({ id: data.productId });
    this.name = data.name;
    this.quantity = data.quantity || 0;
    this.unit = data.unit || '';
  }
}
