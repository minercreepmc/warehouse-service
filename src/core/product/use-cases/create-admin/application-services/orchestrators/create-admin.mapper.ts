import {
  AdminPasswordValueObject,
  AdminUsernameValueObject,
} from '@admin-value-object';
import { AdminEntity } from '@product-entities';
import {
  CreateAdminCommand,
  CreateAdminDomainData,
  CreateAdminResponseDto,
} from './data';

export class CreateAdminMapper {
  toAdminDomainData(command: CreateAdminCommand): CreateAdminDomainData {
    const { username, password } = command;
    return {
      username: new AdminUsernameValueObject(username),
      password: new AdminPasswordValueObject(password),
    };
  }

  toResponseDto(admin: AdminEntity): CreateAdminResponseDto {
    return {
      username: admin.details.username.unpack(),
    };
  }
}
