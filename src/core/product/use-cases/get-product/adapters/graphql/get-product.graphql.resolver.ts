import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class GetProductGraphQlResolver {
  @Query(() => String)
  sayHello() {
    return 'Hello World';
  }
}
