import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetProductHandler } from '@product-use-case/get-product';
import { GetProductGraphQlResolver } from '@product-use-case/get-product/controllers/graphql';
import { GetProductHttpController } from '@product-use-case/get-product/controllers/http';
import { GetProductsHandler } from '@product-use-case/get-products';
import { GetProductsGraphQlResolver } from '@product-use-case/get-products/controllers/graphql';
import { GetProductsHttpController } from '@product-use-case/get-products/controllers/http';
import {
  ProductInfoProjector,
  productInfoRepositoryDiToken,
  ProductInfoService,
} from '@product-views/product-info';
import {
  ProductInfoOrmModel,
  ProductInfoRepository,
} from '../database/repositories/product-info';

const services = [ProductInfoService];
const controllers = [
  ProductInfoProjector,
  GetProductHttpController,
  GetProductsHttpController,
];
const resolvers = [GetProductsGraphQlResolver, GetProductGraphQlResolver];
const queryHandlers: Provider[] = [GetProductsHandler, GetProductHandler];
const repositories: Provider[] = [
  {
    provide: productInfoRepositoryDiToken,
    useClass: ProductInfoRepository,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([ProductInfoOrmModel]), CqrsModule],
  controllers: [...controllers],
  providers: [...services, ...queryHandlers, ...repositories, ...resolvers],
  exports: [...services],
})
export class ViewsModule {}
