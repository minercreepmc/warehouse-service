import { ProductDomainService } from '@domain-services/product/product.domain-service';
import { typeormConfig } from '@driven-adapters/configs/typeorm';
import { ProductEventModel } from '@driven-adapters/database/models';
import { ProductEventStore } from '@driven-adapters/database/repositories';
import { productEventStoreDiToken } from '@driven-ports/product/product.repository.port';
import { ProductHttpController } from '@driver-adapters/controllers/product/http';
import { CreateProductHandler } from '@driver-ports/use-cases/create-product';
import {
  CreateProductOrchestrator,
  createProductOrchestratorDiToken,
} from '@driver-ports/use-cases/create-product/data-flows';
import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

const domainServices = [ProductDomainService];
const httpControllers = [ProductHttpController];
const commandHandlers = [CreateProductHandler];
const orchestrators: Provider[] = [
  {
    provide: createProductOrchestratorDiToken,
    useClass: CreateProductOrchestrator,
  },
];
const repositories: Provider[] = [
  {
    provide: productEventStoreDiToken,
    useClass: ProductEventStore,
  },
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeormConfig),
    TypeOrmModule.forFeature([ProductEventModel]),
    CqrsModule,
  ],
  controllers: [...httpControllers],
  providers: [
    ...domainServices,
    ...commandHandlers,
    ...orchestrators,
    ...repositories,
  ],
})
export class AppModule {}
