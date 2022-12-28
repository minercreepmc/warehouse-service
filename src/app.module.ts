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
} from '@driver-ports/use-cases/create-product/orchestration';
import { ImportProductsHandler } from '@driver-ports/use-cases/import-products/import-products.handler';
import {
  importProductMapperDiToken,
  ImportProductsMapper,
} from '@driver-ports/use-cases/import-products/orchestration';
import { ImportProductsBusinessChecker } from '@driver-ports/use-cases/import-products/orchestration/import-products.business-checker';
import { ImportProductsValidator } from '@driver-ports/use-cases/import-products/orchestration/import-products.validator';
import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

const domainServices = [ProductDomainService];
const httpControllers = [ProductHttpController];
const commandHandlers = [CreateProductHandler, ImportProductsHandler];
const mappers: Provider[] = [
  {
    provide: createProductMapperDiToken,
    useClass: CreateProductMapper,
  },
  {
    provide: importProductMapperDiToken,
    useClass: ImportProductsMapper,
  },
];
const validators: Provider[] = [
  {
    provide: createProductValidatorDiToken,
    useClass: CreateProductValidator,
  },
  ImportProductsValidator,
];
const businessChecker: Provider[] = [
  {
    provide: createProductBusinessCheckerDiToken,
    useClass: CreateProductBusinessChecker,
  },
  ImportProductsBusinessChecker,
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
