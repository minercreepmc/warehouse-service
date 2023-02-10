import { AdminEntityDetails } from '@product-entities';
import {
  AbstractQueryMapper,
  IBaseEntity,
  WhereClause,
} from 'common-base-classes';
import { AdminTypeOrmModel } from './admin.typeorm.model';

export class AdminTypeOrmQueryMapper
  implements AbstractQueryMapper<AdminEntityDetails, AdminTypeOrmModel>
{
  toQuery(
    params: Partial<IBaseEntity & AdminEntityDetails>,
  ): WhereClause<AdminTypeOrmModel> {
    const where: WhereClause<AdminTypeOrmModel> = {};
    if (params.id) {
      where.id = params.id.unpack();
    }

    if (params.createdAt) {
      where.createdAt = params.createdAt.unpack();
    }

    if (params.updatedAt) {
      where.updatedAt = params.updatedAt.unpack();
    }

    if (params.username) {
      where.username = params.username.unpack();
    }

    if (params.password) {
      where.password = params.password.unpack();
    }

    return where;
  }
}
