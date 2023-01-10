import { EventTypeOrmModel } from 'common-base-classes';
import { Column, Entity, Index } from 'typeorm';

export const productEventRelation = 'product-event';

@Entity(productEventRelation)
export class ProductEventModel
  extends EventTypeOrmModel<ProductEventModelDetails>
  implements ProductEventModelIndex
{
  @Column()
  @Index()
  productName: string;
}

export interface ProductEventModelIndex {
  productName: string;
}

export type ProductEventModelDetails = Partial<{
  name: string;
  quantity: number;
  unit: string;
  thumbnails: string[];
}>;
