import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductBusinessRules } from '@product-business-rules';
import { rmqConfig } from '@configs';
import { ClientDynamicModule } from '@configs/client';
import { ProductEventModel } from '@product-database/event-store';
import { ProductDomainService } from '@product-domain-services';
import { ProductMessageMapper } from '@product-gateway/channel';
import { productMessageBrokerDiToken } from '@product-gateway/driven-ports';
import { productEventStoreProvider } from '../../adapters/di/providers';
import {
  ShipProductsBusinessChecker,
  ShipProductsHandler,
  ShipProductsMapper,
  ShipProductsValidator,
} from './application-services';
import { ShipProductsGraphQlResolver } from './controllers/graphql';
import { ShipProductsHttpController } from './controllers/http';

const controllers = [ShipProductsHttpController];
const resolvers: Provider[] = [ShipProductsGraphQlResolver];
const orchestrators: Provider[] = [
  ShipProductsMapper,
  ShipProductsValidator,
  ShipProductsBusinessChecker,
];
const commandHandlers: Provider[] = [ShipProductsHandler];
const domainServices: Provider[] = [ProductDomainService];
const businessRules: Provider[] = [ProductBusinessRules];
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
    ...businessRules,
    ...commandHandlers,
    ...orchestrators,
    ...resolvers,
    ...eventStore,
    ...messageMappers,
  ],
})
export class ShipProductsUseCaseModule {}
