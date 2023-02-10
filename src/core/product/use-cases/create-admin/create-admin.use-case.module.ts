import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminTypeOrmModel } from '@product-database/models';
import { AdminAuthDomainService } from '@product-domain-services/admin-auth.domain-service';
import { CreateAdminHandler } from './application-services';
import { CreateAdminBusinessChecker, CreateAdminMapper, CreateAdminValidator } from './application-services/orchestrators';
import { CreateAdminGraphQlResolver } from './controllers/graphql';

const resolvers: Provider[] = [CreateAdminGraphQlResolver];
const orchestrators: Provider[] = [CreateAdminValidator, CreateAdminBusinessChecker, CreateAdminMapper];
const commandHandlers: Provider[] = [CreateAdminHandler];
const domainServices: Provider[] = [AdminAuthDomainService];
const repositories: Prodiver[] = []

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([AdminTypeOrmModel])],
  providers: [
    ...domainServices,
    ...commandHandlers,
    ...orchestrators,
    ...resolvers,
  ],
})
export class CreateAdminUseCaseModule {}
