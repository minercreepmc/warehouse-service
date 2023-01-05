import { ProductInfoOrmModel } from '@driven-adapters/database/models';
import { ProductInfoRepository } from '@driven-adapters/database/repositories';
import { ProductInfoProjector } from '@driver-adapters/controllers/product/projectors';
import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  productInfoRepositoryDiToken,
  ProductInfoService,
} from './products/product-info';

const services = [ProductInfoService];
const controllers = [ProductInfoProjector];
const repositories: Provider[] = [
  {
    provide: productInfoRepositoryDiToken,
    useClass: ProductInfoRepository,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductInfoOrmModel]),
  ],
  controllers: [...controllers],
  providers: [...services, ...repositories],
  exports: [...services],
})
export class ViewsModule {}
