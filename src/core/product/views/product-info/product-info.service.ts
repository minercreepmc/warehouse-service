import { Inject } from '@nestjs/common';
import { ProductInfoModel } from './product-info.model';
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
    const productInfo = new ProductInfoModel({
      id: data.productId,
      name: data.name,
    });
    this.repository.save(productInfo);
  }

  async addQuantity(data: ProductInfoServiceUpdateData) {
    const productInfo = await this.repository.findOneById(data.productId);
    productInfo.quantity += data.quantity;

    return this.repository.update(data.productId, productInfo);
  }

  async removeQuantity(data: ProductInfoServiceUpdateData) {
    const productInfo = await this.repository.findOneById(data.productId);
    productInfo.quantity -= data.quantity;

    return this.repository.update(data.productId, productInfo);
  }
}
