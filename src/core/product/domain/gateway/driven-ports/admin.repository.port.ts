import { AdminUsernameValueObject } from '@admin-value-object';
import { AdminTypeOrmModel } from '@product-database/models';
import { RepositoryPort } from 'common-base-classes';
import { AdminEntity } from '../../entities/admin.entity';

export interface AdminRepositoryPort
  extends RepositoryPort<AdminEntity, AdminTypeOrmModel> {
  findByUsername(username: AdminUsernameValueObject): Promise<AdminEntity>;
}

export const adminRepositoryDiToken = Symbol('ADMIN_REPOSITORY');
