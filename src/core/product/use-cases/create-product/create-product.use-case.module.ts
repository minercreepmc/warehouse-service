import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { rmqConfig } from '@configs';
import { ClientDynamicModule } from '@configs/client';
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
import {
  CreateProductBusinessValidator,
  CreateProductCommandValidator,
  CreateProductHandler,
  CreateProductMapper,
} from './application-services';
import { CreateProductGraphQlResolver } from './controllers/graphql';
import { CreateProductHttpController } from './controllers/http';

const controllers = [CreateProductHttpController];
const resolvers: Provider[] = [CreateProductGraphQlResolver];
const orchestrators: Provider[] = [
  CreateProductBusinessValidator,
  CreateProductMapper,
  CreateProductCommandValidator,
];
const commandHandlers: Provider[] = [CreateProductHandler];
const domainServices: Provider[] = [ProductDomainService];
const eventStore: Provider[] = [
  {
    provide: productEventStoreDiToken,
    useClass: ProductEventStore,
  },
];
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
export class CreateProductUseCaseModule {}
