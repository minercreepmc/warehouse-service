import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductInfoRepositoryPort } from '@product-views/product-info';
import { AbstractProjectionRepository } from 'common-base-classes';
import { Repository } from 'typeorm';
import { ProductInfoOrmModel } from './product-info.orm-model';

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
  async getProducts(): Promise<ProductInfoOrmModel[]> {
    return this.repository.find({});
  }

  async getProductByName(name: string) {
    return this.repository.findOne({ where: { name } });
  }
}
