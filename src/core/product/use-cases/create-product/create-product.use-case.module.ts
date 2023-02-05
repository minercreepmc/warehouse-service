import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductBusinessRules } from '@product-business-rules';
import { rmqConfig } from '@product-configs';
import { ClientDynamicModule } from '@product-configs/client';
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
import { CreateProductGraphQlResolver } from './controllers/graphql';
import { CreateProductHttpController } from './controllers/http';
import { CreateProductHandler } from './create-product.handler';
import {
  CreateProductBusinessChecker,
  CreateProductMapper,
  CreateProductValidator,
} from './orchestrators';

const controllers = [CreateProductHttpController];
const resolvers: Provider[] = [CreateProductGraphQlResolver];
const orchestrators: Provider[] = [
  CreateProductBusinessChecker,
  CreateProductMapper,
  CreateProductValidator,
];
const commandHandlers: Provider[] = [CreateProductHandler];
const domainServices: Provider[] = [ProductDomainService];
const businessRules: Provider[] = [ProductBusinessRules];
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
    ...businessRules,
    ...commandHandlers,
    ...orchestrators,
    ...resolvers,
    ...eventStore,
    ...messageMappers,
  ],
})
export class CreateProductUseCaseModule {}
