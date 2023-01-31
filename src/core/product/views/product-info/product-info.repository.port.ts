import { ProductInfoOrmModel } from '@product-database/repositories/product-info';
import { ProjectionRepositoryPort } from 'common-base-classes';
import { ProductInfoModel } from './product-info.model';

export interface ProductInfoRepositoryPort
  extends ProjectionRepositoryPort<ProductInfoModel> {
  getProductByName(name: string): Promise<ProductInfoOrmModel>;
  getProducts(): Promise<ProductInfoOrmModel[]>;
}

export const productInfoRepositoryDiToken = Symbol('PRODUCT_INFO_REPOSITORY');
