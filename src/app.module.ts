import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productMessageBrokerDiToken } from '@product-gateway/driven-ports';
import { typeOrmConfig } from '@configs/typeorm';
import { gplModuleOptions } from '@configs/graphql';
import { ClientDynamicModule } from '@configs/client';
import { rmqConfig } from '@configs';
import { DomainModule, ViewsModule } from './core/product/adapters/di/module';

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
