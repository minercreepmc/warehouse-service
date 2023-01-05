import { Inject } from '@nestjs/common';
import { ProductInfoReadModel } from './product-info.read-model';
import {
  productInfoRepositoryDiToken,
  ProductInfoRepositoryPort,
} from './product-info.repository.port';
import {
  ProductInfoServiceCreateData,
  ProductInfoServiceUpdateData,
} from './product-info.service.interface';

export class ProductInfoService {
  constructor(
    @Inject(productInfoRepositoryDiToken)
    private readonly repository: ProductInfoRepositoryPort,
  ) {}
  async create(data: ProductInfoServiceCreateData) {
    const productInfo = new ProductInfoReadModel({
      id: data.productId,
      name: data.name,
    });
    return this.repository.save(productInfo);
  }

  async update(data: ProductInfoServiceUpdateData) {
    const productInfo = await this.repository.findOneById(data.productId);
    productInfo.quantity += data.quantity;

    return this.repository.update(data.productId, productInfo);
  }
}
