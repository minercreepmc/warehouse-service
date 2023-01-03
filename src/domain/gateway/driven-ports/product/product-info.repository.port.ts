import { ProductInfoReadModel } from '@views/products/read-models';
import { ProjectionRepositoryPort } from 'common-base-classes';

export interface ProductInfoRepositoryPort
  extends ProjectionRepositoryPort<ProductInfoReadModel> {}

export const productInfoRepositoryDiToken = Symbol('PRODUCT_INFO_REPOSITORY');
