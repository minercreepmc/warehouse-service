import { AbstractTypeOrmModel } from 'common-base-classes';
import { Column, Entity } from 'typeorm';

@Entity('product-info')
export class ProductInfoOrmModel extends AbstractTypeOrmModel {
  @Column()
  name: string;

  @Column()
  quantity: number;
}
