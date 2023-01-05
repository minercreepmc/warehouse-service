import { Inject } from '@nestjs/common';
import {
  ProductInfoReadModel,
  ProductInfoReadModelData,
} from './product-info.read-model';
import {
  productInfoRepositoryDiToken,
  ProductInfoRepositoryPort,
} from './product-info.repository.port';

export class ProductInfoService {
  constructor(
    @Inject(productInfoRepositoryDiToken)
    private readonly repository: ProductInfoRepositoryPort,
  ) {}
  async create(data: ProductInfoReadModelData) {
    const productInfo = new ProductInfoReadModel(data);
    return this.repository.save(productInfo);
  }

  async update(data: ProductInfoReadModelData) {
    return this.repository.update(data.id, data);
  }
}
