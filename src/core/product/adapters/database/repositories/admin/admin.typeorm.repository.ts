import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity, AdminEntityDetails } from '@product-entities';
import { AbstractTypeormRepository } from 'common-base-classes';
import { Repository } from 'typeorm';
import { AdminTypeOrmMapper } from './admin.typeorm.mapper';
import { AdminTypeOrmModel } from './admin.typeorm.model';
import { AdminTypeOrmQueryMapper } from './admin.typeorm.query-mapper';

@Injectable()
export class AdminTypeOrmRepository extends AbstractTypeormRepository<
  AdminEntity,
  AdminEntityDetails,
  AdminTypeOrmModel
> {
  constructor(
    @InjectRepository(AdminTypeOrmModel)
    repository: Repository<AdminTypeOrmModel>,
  ) {
    super(
      repository,
      new AdminTypeOrmMapper(AdminEntity, AdminTypeOrmModel),
      new AdminTypeOrmQueryMapper(),
      new Logger(AdminTypeOrmRepository.name),
    );
  }
}
