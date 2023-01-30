import { ProductInfoOrmModel } from '@driven-adapters/database/models';
import { ProductInfoRepository } from '@driven-adapters/database/repositories';
import { ProductInfoProjector } from '@driver-adapters/controllers/product/projectors';
import { ProductResolver } from '@driver-adapters/resolvers/product';
import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  productInfoRepositoryDiToken,
  ProductInfoService,
} from '@views/products/product-info';
import {
  GetProductHandler,
  GetProductsHandler,
} from '@views/products/product-info/use-cases';

const services = [ProductInfoService];
const controllers = [ProductInfoProjector];
const resolvers = [ProductResolver];
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
