import { Inject } from '@nestjs/common';
import { ProductInfoModel } from './product-info.model';
import {
  productInfoRepositoryDiToken,
  ProductInfoRepositoryPort,
} from './product-info.repository.port';
import {
  CreateProductInfoOptions,
  UpdateProductInfoServiceOptions,
} from './product-info.service.interface';

export class ProductInfoService {
  constructor(
    @Inject(productInfoRepositoryDiToken)
    private readonly repository: ProductInfoRepositoryPort,
  ) {}
  async create(options: CreateProductInfoOptions) {
    const productInfo = new ProductInfoModel({
      id: options.productId,
      name: options.name,
    });
    this.repository.save(productInfo);
  }

  async addQuantity(options: UpdateProductInfoServiceOptions) {
    const productInfo = await this.repository.findOneById(options.productId);
    productInfo.quantity += options.quantity;

    return this.repository.update(options.productId, productInfo);
  }

  async removeQuantity(options: UpdateProductInfoServiceOptions) {
    const productInfo = await this.repository.findOneById(options.productId);
    productInfo.quantity -= options.quantity;

    return this.repository.update(options.productId, productInfo);
  }
}
