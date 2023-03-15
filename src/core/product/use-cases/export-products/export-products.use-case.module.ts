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
import {
  ExportProductsBusinessValidator,
  ExportProductsCommandValidator,
  ExportProductsHandler,
  ExportProductsMapper,
} from './application-services';
import { ExportProductsHttpController } from './controllers/http';
import { ExportProductsGraphQlResolver } from './controllers/graphql';

const controllers = [ExportProductsHttpController];
const resolvers: Provider[] = [ExportProductsGraphQlResolver];
const orchestrators: Provider[] = [
  ExportProductsMapper,
  ExportProductsCommandValidator,
  ExportProductsBusinessValidator,
];
const commandHandlers: Provider[] = [ExportProductsHandler];
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
export class ExportProductsUseCaseModule {}
