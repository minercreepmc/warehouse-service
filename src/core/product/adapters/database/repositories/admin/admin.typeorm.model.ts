import { AbstractTypeOrmModel } from 'common-base-classes';
import { Column } from 'typeorm';

export class AdminTypeOrmModel extends AbstractTypeOrmModel {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
