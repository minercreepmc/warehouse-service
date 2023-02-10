import {
  AdminPasswordValueObject,
  AdminUsernameValueObject,
} from '@admin-value-object';

export interface CreateAdminDomainData {
  username: AdminUsernameValueObject;
  password: AdminPasswordValueObject;
}
