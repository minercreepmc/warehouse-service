import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AdminEntity } from '@product-entities';
import { UUID } from 'common-base-classes';
import { Err, Ok } from 'oxide.ts';
import {
  CreateAdminValidator,
  CreateAdminMapper,
  CreateAdminBusinessChecker,
} from './orchestrators';
import { CreateAdminCommand, CreateAdminResult } from './orchestrators/data';

@CommandHandler(CreateAdminCommand)
export class CreateAdminHandler
  implements ICommandHandler<CreateAdminCommand, CreateAdminResult>
{
  constructor(
    private readonly validator: CreateAdminValidator,
    private readonly mapper: CreateAdminMapper,
    private readonly businessChecker: CreateAdminBusinessChecker,
  ) {}

  async execute(command: CreateAdminCommand): Promise<CreateAdminResult> {
    this.validator.validate(command);

    if (!this.validator.isValid()) {
      return Err(this.validator.errors);
    }

    const domainData = this.mapper.toAdminDomainData(command);

    await this.businessChecker.check(domainData);
    if (!this.businessChecker.isValid()) {
      return Err(this.businessChecker.errors);
    }

    const admin = new AdminEntity(UUID.create(), domainData);

    return Ok(this.mapper.toResponseDto(admin));
  }
}
