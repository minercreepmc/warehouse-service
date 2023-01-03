import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractProjectionRepository } from 'common-base-classes';
import { Repository } from 'typeorm';
import { ProductInfoOrmModel } from '../models';

@Injectable()
export class ProductInfoRepository extends AbstractProjectionRepository<ProductInfoOrmModel> {
  constructor(
    @InjectRepository(ProductInfoOrmModel)
    repository: Repository<ProductInfoOrmModel>,
  ) {
    super(repository, new Logger(ProductInfoRepository.name));
  }
}
