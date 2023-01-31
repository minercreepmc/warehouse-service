import { ApolloDriver } from '@nestjs/apollo';
import { GqlModuleOptions } from '@nestjs/graphql';
import { join } from 'path';

export const gplModuleOptions: GqlModuleOptions = {
  autoSchemaFile: join(process.cwd(), 'src/configs/graphql/schema.gql'),
  driver: ApolloDriver,
};
