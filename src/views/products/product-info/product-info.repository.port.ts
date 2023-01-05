import { ProjectionRepositoryPort } from 'common-base-classes';
import { ProductInfoReadModel } from './product-info.read-model';

export interface ProductInfoRepositoryPort
  extends ProjectionRepositoryPort<ProductInfoReadModel> {}

export const productInfoRepositoryDiToken = Symbol('PRODUCT_INFO_REPOSITORY');
