import { AdminBusinessError, AdminDomainError } from '@product-domain-errors';
import { AdminAuthDomainService } from '@product-domain-services/admin-auth.domain-service';
import { AbstractNotificationWrapper } from 'common-base-classes';
import type { AdminUsernameValueObject } from '@admin-value-object';
import type { CreateAdminDomainData } from './data';

export class CreateAdminBusinessChecker extends AbstractNotificationWrapper<AdminBusinessError> {
  constructor(private readonly adminAuthDomainService: AdminAuthDomainService) {
    super();
  }

  async check(domainData: CreateAdminDomainData) {
    this.clearNote();
    await this._check(domainData);
  }

  private async _check(domainData: CreateAdminDomainData) {
    const { username } = domainData;
    await this.checkAdminUsernameMustNotExist(username);
  }

  private async checkAdminUsernameMustNotExist(
    username: AdminUsernameValueObject,
  ) {
    const adminExist = await this.adminAuthDomainService.isAdminExist(username);
    if (adminExist) {
      this.note.addNote(new AdminDomainError.UsernameIsExist());
    }
  }
}
