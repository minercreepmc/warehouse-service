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
import { AddProductThumbnailsHandler } from './application-services';
import {
  AddProductThumbnailsMapper,
  AddProductThumbnailsValidator,
} from './application-services/orchestrators';
import { AddProductThumbnailsHttpController } from './controllers/http';

const controllers = [AddProductThumbnailsHttpController];
const orchestrators: Provider[] = [
  AddProductThumbnailsMapper,
  AddProductThumbnailsValidator,
];
const commandHandlers: Provider[] = [AddProductThumbnailsHandler];
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
    ...eventStore,
    ...messageMappers,
  ],
})
export class AddProductThumbnailsUseCaseModule {}
