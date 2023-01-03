import { ProductDomainService } from '@domain-services/product';
import { RmqModule } from '@driven-adapters/configs/rmq';
import { typeormConfig } from '@driven-adapters/configs/typeorm';
import {
  ProductEventModel,
  ProductInfoOrmModel,
} from '@driven-adapters/database/models';
import {
  ProductEventStore,
  ProductInfoRepository,
} from '@driven-adapters/database/repositories';
import { ProductHttpController } from '@driver-adapters/controllers/product/http';
import { CreateProductHandler } from '@driver-ports/use-cases/create-product';
import {
  CreateProductBusinessChecker,
  createProductBusinessCheckerDiToken,
  CreateProductMapper,
  createProductMapperDiToken,
  CreateProductValidator,
  createProductValidatorDiToken,
} from '@driver-ports/use-cases/create-product/orchestrators';
import { GetQualityOnHandHandler } from '@driver-ports/use-cases/get-quality-on-hand';
import {
  GetQualityOnHandBusinessChecker,
  GetQualityOnHandMapper,
  GetQualityOnHandValidator,
} from '@driver-ports/use-cases/get-quality-on-hand/orchestrators';
import { ImportProductsHandler } from '@driver-ports/use-cases/import-products/import-products.handler';
import {
  importProductMapperDiToken,
  ImportProductsBusinessChecker,
  ImportProductsMapper,
  ImportProductsValidator,
} from '@driver-ports/use-cases/import-products/orchestrators';
import {
  ShipProductsBusinessChecker,
  ShipProductsValidator,
} from '@driver-ports/use-cases/ship-products/orchestrators';
import { ShipProductsMapper } from '@driver-ports/use-cases/ship-products/orchestrators/ship-products.mapper';
import { ShipProductsHandler } from '@driver-ports/use-cases/ship-products/ship-products.handler';
import { ProductMessageMapper } from '@gateway/channel';
import {
  productEventStoreDiToken,
  productInfoRepositoryDiToken,
  productRmqDiToken,
} from '@gateway/driven-ports/product';
import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInfoProjector } from '@views/products/projectors';

const domainServices: Provider[] = [ProductDomainService];
const httpControllers = [ProductHttpController];
const projectors = [ProductInfoProjector];
const commandHandlers: Provider[] = [
  CreateProductHandler,
  ImportProductsHandler,
  ShipProductsHandler,
];
const queryHandlers: Provider[] = [GetQualityOnHandHandler];
const mappers: Provider[] = [
  {
    provide: createProductMapperDiToken,
    useClass: CreateProductMapper,
  },
  {
    provide: importProductMapperDiToken,
    useClass: ImportProductsMapper,
  },
  ShipProductsMapper,
  GetQualityOnHandMapper,
  ProductMessageMapper,
];
const validators: Provider[] = [
  {
    provide: createProductValidatorDiToken,
    useClass: CreateProductValidator,
  },
  ImportProductsValidator,
  ShipProductsValidator,
  GetQualityOnHandValidator,
];
const businessChecker: Provider[] = [
  {
    provide: createProductBusinessCheckerDiToken,
    useClass: CreateProductBusinessChecker,
  },
  ImportProductsBusinessChecker,
  ShipProductsBusinessChecker,
  GetQualityOnHandBusinessChecker,
];
const repositories: Provider[] = [
  {
    provide: productEventStoreDiToken,
    useClass: ProductEventStore,
  },
  {
    provide: productInfoRepositoryDiToken,
    useClass: ProductInfoRepository,
  },
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RmqModule.register({ name: productRmqDiToken }),
    TypeOrmModule.forRoot(typeormConfig),
    TypeOrmModule.forFeature([ProductEventModel, ProductInfoOrmModel]),
    CqrsModule,
  ],
  controllers: [...httpControllers, ...projectors],
  providers: [
    ...validators,
    ...businessChecker,
    ...mappers,
    ...domainServices,
    ...commandHandlers,
    ...queryHandlers,
    ...repositories,
  ],
})
export class AppModule {}
