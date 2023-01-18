import { ProductHttpController } from '@driver-adapters/controllers/product/http';
import {
  AddProductThumbnailsHandler,
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
  ShipProductsBusinessChecker,
  ShipProductsMapper,
  ShipProductsValidator,
} from '@driver-ports/use-cases/ship-products';
import {
  AddProductThumbnailsMapper,
  AddProductThumbnailsValidator,
} from '@driver-ports/use-cases/add-product-thumbnails/orchestrators';
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
import { ProductBusinessRules } from './business-rules';

const httpControllers = [ProductHttpController];
const domainServices: Provider[] = [ProductDomainService];
const businessRules: Provider[] = [ProductBusinessRules];
const commandHandlers: Provider[] = [
  CreateProductHandler,
  ImportProductsHandler,
  ShipProductsHandler,
  AddProductThumbnailsHandler,
];

const mappers: Provider[] = [
  CreateProductMapper,
  ImportProductsMapper,
  ShipProductsMapper,
  ProductMessageMapper,
  AddProductThumbnailsMapper,
];
const validators: Provider[] = [
  CreateProductValidator,
  ImportProductsValidator,
  ShipProductsValidator,
  AddProductThumbnailsValidator,
];
const businessChecker: Provider[] = [
  CreateProductBusinessChecker,
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
    CqrsModule,
    TypeOrmModule.forFeature([ProductEventModel]),
    RmqModule.register({ name: productRmqDiToken }),
  ],
  controllers: [...httpControllers],
  providers: [
    ...domainServices,
    ...businessRules,
    ...commandHandlers,
    ...mappers,
    ...validators,
    ...businessChecker,
    ...repositories,
  ],
})
export class DomainModule {}
