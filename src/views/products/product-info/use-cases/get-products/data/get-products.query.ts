import { IQuery } from '@nestjs/cqrs';

export class GetProductsQuery implements IQuery {
  constructor(dto?: any) {
    //
  }
}
