import { ApolloDriver } from '@nestjs/apollo';
import { GqlModuleOptions } from '@nestjs/graphql';
import { join } from 'path';

export const gplModuleOptions: GqlModuleOptions = {
  autoSchemaFile: join(
    process.cwd(),
    'src/adapters/driver-adapters/schemas/schema.gql',
  ),
  driver: ApolloDriver,
};
