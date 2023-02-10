import {
  AdminPasswordValueObject,
  AdminUsernameValueObject,
} from '@admin-value-object';
import { AdminEntity, AdminEntityDetails } from '@product-entities';
import { AbstractTypeOrmMapper, OrmModelDetails } from 'common-base-classes';
import { AdminTypeOrmModel } from './admin.typeorm.model';

export type AdminTypeOrmModelDetails = OrmModelDetails<AdminTypeOrmModel>;

export class AdminTypeOrmMapper extends AbstractTypeOrmMapper<
  AdminEntity,
  AdminEntityDetails,
  AdminTypeOrmModel
> {
  protected toPersistanceDetails(
    entity: AdminEntity,
  ): AdminTypeOrmModelDetails {
    const ormDetails: AdminTypeOrmModelDetails = {
      username: entity.details.username.unpack(),
      password: entity.details.password.unpack(),
    };

    return ormDetails;
  }
  protected toDomainDetails(ormModel: AdminTypeOrmModel): AdminEntityDetails {
    const { username, password } = ormModel;

    const domainDetails: AdminEntityDetails = {
      username: new AdminUsernameValueObject(username),
      password: new AdminPasswordValueObject(password),
    };

    return domainDetails;
  }
}
