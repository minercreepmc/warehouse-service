import { ProductInfoOrmModel } from '@driven-adapters/database/models';
import { ProjectionRepositoryPort } from 'common-base-classes';
import { ProductInfoReadModel } from './product-info.read-model';

export interface ProductInfoRepositoryPort
  extends ProjectionRepositoryPort<ProductInfoReadModel> {
  getProductByName(name: string): Promise<ProductInfoOrmModel>;
  getProducts(): Promise<ProductInfoOrmModel[]>;
}

export const productInfoRepositoryDiToken = Symbol('PRODUCT_INFO_REPOSITORY');
