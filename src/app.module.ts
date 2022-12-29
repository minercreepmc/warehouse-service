import { ProductDomainService } from '@domain-services/product';
import { typeormConfig } from '@driven-adapters/configs/typeorm';
import { ProductEventModel } from '@driven-adapters/database/models';
import { ProductEventStore } from '@driven-adapters/database/repositories';
import { productEventStoreDiToken } from '@driven-ports/product/product.repository.port';
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
import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

const domainServices = [ProductDomainService];
const httpControllers = [ProductHttpController];
const commandHandlers = [
  CreateProductHandler,
  ImportProductsHandler,
  ShipProductsHandler,
];
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
];
const validators: Provider[] = [
  {
    provide: createProductValidatorDiToken,
    useClass: CreateProductValidator,
  },
  ImportProductsValidator,
  ShipProductsValidator,
];
const businessChecker: Provider[] = [
  {
    provide: createProductBusinessCheckerDiToken,
    useClass: CreateProductBusinessChecker,
  },
  ImportProductsBusinessChecker,
  ShipProductsBusinessChecker,
];
const repositories: Provider[] = [
  {
    provide: productEventStoreDiToken,
    useClass: ProductEventStore,
  },
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeormConfig),
    TypeOrmModule.forFeature([ProductEventModel]),
    CqrsModule,
  ],
  controllers: [...httpControllers],
  providers: [
    ...validators,
    ...businessChecker,
    ...mappers,
    ...domainServices,
    ...commandHandlers,
    ...repositories,
  ],
})
export class AppModule {}
