import { DynamicModule, Module } from '@nestjs/common';
import { ClientOptions, ClientsModule } from '@nestjs/microservices';

export interface ClientModuleConfig {
  domain: string;
  user: string;
  password: string;
  host: number;
  queueName: string;
  transport: number;
}
export const clientNameDiToken = Symbol('CLIENT');

export interface ClientModuleOptions {
  name: string | symbol;
  config: ClientModuleConfig;
}

@Module({})
export class ClientDynamicModule {
  static register(options: ClientModuleOptions): DynamicModule {
    const { name, config } = options;
    const clientNameProvider = {
      provide: clientNameDiToken,
      useValue: name,
    };

    return {
      module: ClientDynamicModule,
      imports: [ClientDynamicModule.registerClient(name, config)],
      providers: [clientNameProvider],
      exports: [ClientsModule],
    };
  }

  static registerClient(
    name: string | symbol,
    config: ClientModuleConfig,
  ): DynamicModule {
    return ClientsModule.registerAsync([
      {
        name,
        useFactory: () => {
          return ClientDynamicModule.createOptions(config);
        },
      },
    ]);
  }

  static createOptions(config: ClientModuleConfig): ClientOptions {
    const domain = config.domain;
    const user = config.user;
    const password = config.password;
    const host = config.host;
    const queueName = config.queueName;
    const transport = config.transport;

    return {
      transport,
      options: {
        urls: [`${domain}://${user}:${password}@${host}`],
        queue: queueName,
      },
    };
  }
}
