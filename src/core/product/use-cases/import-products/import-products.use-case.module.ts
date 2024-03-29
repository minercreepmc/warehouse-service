import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { rmqConfig } from '@configs';
import { ClientDynamicModule } from '@configs/client';
import { ProductEventModel } from '@product-database/event-store';
import { ProductDomainService } from '@product-domain-services';
import { ProductMessageMapper } from '@product-gateway/channel';
import { productMessageBrokerDiToken } from '@product-gateway/driven-ports';
import { productEventStoreProvider } from '../../adapters/di/providers';
import { ImportProductsHandler } from './application-services/import-products.handler';
import { ImportProductsGraphQlResolver } from './controllers/graphql';
import { ImportProductsHttpController } from './controllers/http';
import {
  ImportProductsBusinessValidator,
  ImportProductsCommandValidator,
  ImportProductsMapper,
} from './application-services';

const controllers = [ImportProductsHttpController];
const resolvers: Provider[] = [ImportProductsGraphQlResolver];
const orchestrators: Provider[] = [
  ImportProductsMapper,
  ImportProductsCommandValidator,
  ImportProductsBusinessValidator,
];
const commandHandlers: Provider[] = [ImportProductsHandler];
const domainServices: Provider[] = [ProductDomainService];
const eventStore: Provider[] = [productEventStoreProvider];
const messageMappers: Provider[] = [ProductMessageMapper];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ProductEventModel]),
    ClientDynamicModule.register({
      name: productMessageBrokerDiToken,
      config: rmqConfig,
    }),
  ],
  controllers: [...controllers],
  providers: [
    ...domainServices,
    ...commandHandlers,
    ...orchestrators,
    ...resolvers,
    ...eventStore,
    ...messageMappers,
  ],
})
export class ImportProductUseCaseModule {}
