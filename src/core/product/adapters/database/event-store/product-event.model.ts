import { EventTypeOrmModel } from 'nest-typeorm-common-classes';
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
  thumbnails: string[];
  postponed: number;
  isPostponed: boolean;
}>;
