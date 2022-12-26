import { EventTypeOrmModel } from 'common-base-classes';
import { Entity } from 'typeorm';

export const productEventRelation = 'product-event';

@Entity(productEventRelation)
export class ProductEventModel extends EventTypeOrmModel<ProductEventModelDetails> {}

export type ProductEventModelDetails = Partial<{
  name: string;
  quantity: number;
  unit: string;
}>;
