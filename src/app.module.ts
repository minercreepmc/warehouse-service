import { ProductDomainService } from '@domain-services/product/product.domain-service';
import { ProductHttpController } from '@driver-adapters/controllers/product/http';
import { CreateProductHandler } from '@driver-ports/use-cases/create-product';
import { CreateProductOrchestrator, createProductOrchestratorDiToken } from '@driver-ports/use-cases/create-product/data-flows';
import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

const domainServices = [ProductDomainService];
const httpControllers = [ProductHttpController];
const commandHandlers = [CreateProductHandler];
const orchestrators: Provider[] = [{
  provide: createProductOrchestratorDiToken,
  useClass: CreateProductOrchestrator
}];

@Module({
  imports: [CqrsModule],
  controllers: [...httpControllers],
  providers: [...domainServices, ...commandHandlers, ...orchestrators],
})
export class AppModule {}
