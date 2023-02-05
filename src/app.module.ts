import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productMessageBrokerDiToken } from '@product-gateway/driven-ports';
import { typeOrmConfig } from '@product-configs/typeorm';
import { gplModuleOptions } from '@product-configs/graphql';
import { DomainModule, ViewsModule } from './core/product/adapters/di';
import { ClientDynamicModule } from '@product-configs/client';
import { rmqConfig } from '@product-configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    //RmqModule.register({ name: productRmqDiToken }),
    ClientDynamicModule.register({
      name: productMessageBrokerDiToken,
      config: rmqConfig,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>(gplModuleOptions),
    //OutboxModule.forRoot(outBoxConfig),
    DomainModule,
    ViewsModule,
  ],
})
export class AppModule {}
