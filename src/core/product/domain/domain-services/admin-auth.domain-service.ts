import {
  AdminPasswordValueObject,
  AdminUsernameValueObject,
} from '@admin-value-object';
import { Inject, Injectable } from '@nestjs/common';
import { AdminDomainError } from '@product-domain-errors';
import {
  AuthServicePort,
  authServiceDiToken,
} from '@product-gateway/driven-ports';
import {
  adminRepositoryDiToken,
  AdminRepositoryPort,
} from '@product-gateway/driven-ports/admin.repository.port';
import { AdminEntity } from '../entities/admin.entity';

@Injectable()
export class AdminAuthDomainService {
  constructor(
    @Inject(authServiceDiToken)
    private readonly authService: AuthServicePort,
    @Inject(adminRepositoryDiToken)
    private readonly adminRepository: AdminRepositoryPort,
  ) {}

  async authenticate(
    username: AdminUsernameValueObject,
    password: AdminPasswordValueObject,
  ): Promise<AdminEntity> {
    const admin = await this.adminRepository.findByUsername(username);
    if (!admin) {
      throw new AdminDomainError.UsernameIsExist();
    }

    const authResult = await this.authService.authenticate(username, password);
    if (!authResult.isAuthenticated) {
      throw authResult.error;
    }
  }

  async isAdminExist(username: AdminUsernameValueObject) {
    const admin = await this.adminRepository.findByUsername(username);
    return !!admin;
  }
}
