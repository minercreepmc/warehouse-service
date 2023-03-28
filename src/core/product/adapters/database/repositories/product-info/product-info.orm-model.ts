import { AbstractTypeOrmModel } from 'nest-typeorm-common-classes';
import { Column, Entity } from 'typeorm';

@Entity('product-info')
export class ProductInfoOrmModel extends AbstractTypeOrmModel {
  @Column()
  name: string;

  @Column()
  quantity: number;
}
