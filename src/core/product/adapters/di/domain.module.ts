import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductBusinessRules } from '@product-business-rules';
import { RmqModule } from '@product-configs/rmq';
import { ProductDomainService } from '@product-domain-services';
import { ProductMessageMapper } from '@product-gateway/channel';
import {
  productEventStoreDiToken,
  productRmqDiToken,
} from '@product-gateway/driven-ports';
import { AddProductThumbnailsHandler } from '@product-use-case/add-product-thumbnails';
import { AddProductThumbnailsHttpController } from '@product-use-case/add-product-thumbnails/controllers/http';
import {
  AddProductThumbnailsMapper,
  AddProductThumbnailsValidator,
} from '@product-use-case/add-product-thumbnails/orchestrators';
import {
  CreateProductBusinessChecker,
  CreateProductHandler,
  CreateProductMapper,
  CreateProductValidator,
} from '@product-use-case/create-product';
import { CreateProductGraphQlResolver } from '@product-use-case/create-product/controllers/graphql/create-product.graphql.resolver';
import { CreateProductHttpController } from '@product-use-case/create-product/controllers/http';
import {
  ImportProductsBusinessChecker,
  ImportProductsHandler,
  ImportProductsMapper,
  ImportProductsValidator,
} from '@product-use-case/import-products';
import { ImportProductsGraphQlResolver } from '@product-use-case/import-products/controllers/graphql';
import { ImportProductsHttpController } from '@product-use-case/import-products/controllers/http';
import {
  ShipProductsBusinessChecker,
  ShipProductsHandler,
  ShipProductsMapper,
  ShipProductsValidator,
} from '@product-use-case/ship-products';
import { ShipProductsGraphQlResolver } from '@product-use-case/ship-products/controllers/graphql';
import { ShipProductsHttpController } from '@product-use-case/ship-products/controllers/http';
import { OutboxModule, OutboxService } from 'nestjs-outbox-pattern';
import { ProductEventModel, ProductEventStore } from '../database/event-store';

const httpControllers = [
  CreateProductHttpController,
  ImportProductsHttpController,
  ShipProductsHttpController,
  AddProductThumbnailsHttpController,
];
const graphQlResolvers = [
  CreateProductGraphQlResolver,
  ImportProductsGraphQlResolver,
  ShipProductsGraphQlResolver,
];
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
    ...graphQlResolvers,
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
