import { IQuery } from '@nestjs/cqrs';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetProductQuery implements IQuery {
  @IsNotEmpty()
  @IsString()
  name: string;

  constructor(name: any) {
    this.name = name;
  }
}
