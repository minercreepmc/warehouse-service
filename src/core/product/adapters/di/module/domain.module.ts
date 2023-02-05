import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductBusinessRules } from '@product-business-rules';
import { RmqModule } from '@product-configs/rmq';
import {
  ProductEventModel,
  ProductEventStore,
} from '@product-database/event-store';
import { ProductDomainService } from '@product-domain-services';
import { ProductMessageMapper } from '@product-gateway/channel';
import {
  productEventStoreDiToken,
  productMessageBrokerDiToken,
} from '@product-gateway/driven-ports';
import { AddProductThumbnailsHandler } from '@product-use-case/add-product-thumbnails';
import { AddProductThumbnailsHttpController } from '@product-use-case/add-product-thumbnails/controllers/http';
import {
  AddProductThumbnailsMapper,
  AddProductThumbnailsValidator,
} from '@product-use-case/add-product-thumbnails/orchestrators';
import { CreateProductUseCaseModule } from '@product-use-case/create-product/create-product.use-case.module';
import { ImportProductUseCaseModule } from '@product-use-case/import-products';
import { ImportProductsGraphQlResolver } from '@product-use-case/import-products/controllers/graphql';
import { ImportProductsHttpController } from '@product-use-case/import-products/controllers/http';
import { ShipProductsUseCaseModule } from '@product-use-case/ship-products';
import { ShipProductsGraphQlResolver } from '@product-use-case/ship-products/controllers/graphql';
import { ShipProductsHttpController } from '@product-use-case/ship-products/controllers/http';

const httpControllers = [
  ImportProductsHttpController,
  ShipProductsHttpController,
  AddProductThumbnailsHttpController,
];
const graphQlResolvers = [
  ImportProductsGraphQlResolver,
  ShipProductsGraphQlResolver,
];
const domainServices: Provider[] = [ProductDomainService];
const businessRules: Provider[] = [ProductBusinessRules];
const commandHandlers: Provider[] = [AddProductThumbnailsHandler];

const mappers: Provider[] = [ProductMessageMapper, AddProductThumbnailsMapper];
const validators: Provider[] = [AddProductThumbnailsValidator];
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
    RmqModule.register({ name: productMessageBrokerDiToken }),
    CreateProductUseCaseModule,
    ImportProductUseCaseModule,
    ShipProductsUseCaseModule,
  ],
  controllers: [...httpControllers],
  providers: [
    ...graphQlResolvers,
    ...domainServices,
    ...businessRules,
    ...commandHandlers,
    ...mappers,
    ...validators,
    ...repositories,
  ],
})
export class DomainModule {}
