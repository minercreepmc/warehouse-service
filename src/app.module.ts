import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RmqModule } from '@product-configs/rmq';
import { productRmqDiToken } from '@product-gateway/driven-ports';
import { typeormConfig } from '@product-configs/typeorm';
import { gplModuleOptions } from '@product-configs/graphql';
import { DomainModule, ViewsModule } from './core/product/adapters/di';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RmqModule.register({ name: productRmqDiToken }),
    TypeOrmModule.forRoot(typeormConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>(gplModuleOptions),
    DomainModule,
    ViewsModule,
  ],
})
export class AppModule {}
