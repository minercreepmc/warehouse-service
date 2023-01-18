import { ProductInfoOrmModel } from '@driven-adapters/database/models';
import { ProductInfoRepository } from '@driven-adapters/database/repositories';
import { ProductInfoProjector } from '@driver-adapters/controllers/product/projectors';
import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  productInfoRepositoryDiToken,
  ProductInfoService,
} from './products/product-info';
import { GetQualityOnHandHandler } from './products/product-info/use-cases';

const services = [ProductInfoService];
const controllers = [ProductInfoProjector];
const queryHandlers: Provider[] = [GetQualityOnHandHandler];
const validators: Provider[] = [GetQualityOnHandHandler];
const repositories: Provider[] = [
  {
    provide: productInfoRepositoryDiToken,
    useClass: ProductInfoRepository,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([ProductInfoOrmModel]), CqrsModule],
  controllers: [...controllers],
  providers: [...services, ...queryHandlers, ...validators, ...repositories],
  exports: [...services],
})
export class ViewsModule {}
