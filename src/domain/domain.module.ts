import { ProductHttpController } from '@driver-adapters/controllers/product/http';
import {
  CreateProductHandler,
  ImportProductsHandler,
  ShipProductsHandler,
} from '@driver-ports/use-cases';

import {
  CreateProductBusinessChecker,
  CreateProductMapper,
  CreateProductValidator,
} from '@driver-ports/use-cases/create-product';
import {
  ImportProductsBusinessChecker,
  ImportProductsMapper,
  ImportProductsValidator,
} from '@driver-ports/use-cases/import-products';
import {
  GetQualityOnHandBusinessChecker,
  GetQualityOnHandHandler,
  GetQualityOnHandMapper,
  GetQualityOnHandValidator,
} from '@driver-ports/use-cases/get-quality-on-hand';
import {
  ShipProductsBusinessChecker,
  ShipProductsMapper,
  ShipProductsValidator,
} from '@driver-ports/use-cases/ship-products';
import { Module, Provider } from '@nestjs/common';
import { ProductMessageMapper } from '@gateway/channel';
import { ProductEventStore } from '@driven-adapters/database/repositories';
import {
  productEventStoreDiToken,
  productRmqDiToken,
} from '@gateway/driven-ports/product';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEventModel } from '@driven-adapters/database/models';
import { ProductDomainService } from '@domain-services/product';
import { RmqModule } from '@driven-adapters/configs/rmq';
import { CqrsModule } from '@nestjs/cqrs';

const httpControllers = [ProductHttpController];
const domainServices: Provider[] = [ProductDomainService];
const commandHandlers: Provider[] = [
  CreateProductHandler,
  ImportProductsHandler,
  ShipProductsHandler,
];
const queryHandlers: Provider[] = [GetQualityOnHandHandler];

const mappers: Provider[] = [
  CreateProductMapper,
  ImportProductsMapper,
  ShipProductsMapper,
  GetQualityOnHandMapper,
  ProductMessageMapper,
];
const validators: Provider[] = [
  CreateProductValidator,
  ImportProductsValidator,
  ShipProductsValidator,
  GetQualityOnHandValidator,
];
const businessChecker: Provider[] = [
  CreateProductBusinessChecker,
  ImportProductsBusinessChecker,
  ShipProductsBusinessChecker,
  GetQualityOnHandBusinessChecker,
];
const repositories: Provider[] = [
  {
    provide: productEventStoreDiToken,
    useClass: ProductEventStore,
  },
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ProductEventModel]),
    RmqModule.register({ name: productRmqDiToken }),
  ],
  controllers: [...httpControllers],
  providers: [
    ...domainServices,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
    ...validators,
    ...businessChecker,
    ...repositories,
  ],
})
export class DomainModule {}
