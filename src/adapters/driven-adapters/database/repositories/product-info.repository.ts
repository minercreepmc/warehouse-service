import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductInfoRepositoryPort } from '@views/products/product-info';
import { AbstractProjectionRepository } from 'common-base-classes';
import { Repository } from 'typeorm';
import { ProductInfoOrmModel } from '../models';

@Injectable()
export class ProductInfoRepository
  extends AbstractProjectionRepository<ProductInfoOrmModel>
  implements ProductInfoRepositoryPort
{
  constructor(
    @InjectRepository(ProductInfoOrmModel)
    repository: Repository<ProductInfoOrmModel>,
  ) {
    super(repository, new Logger(ProductInfoRepository.name));
  }

  async getProductByName(name: string) {
    return this.repository.findOne({ where: { name } });
  }
}
