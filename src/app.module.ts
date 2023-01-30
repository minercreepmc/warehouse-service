import { RmqModule } from '@driven-adapters/configs/rmq';
import { typeormConfig } from '@driven-adapters/configs/typeorm';
import { gplModuleOptions } from '@driver-adapters/config/graphql.config';
import { productRmqDiToken } from '@gateway/driven-ports/product';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainModule, ViewsModule } from './adapters/di';

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
