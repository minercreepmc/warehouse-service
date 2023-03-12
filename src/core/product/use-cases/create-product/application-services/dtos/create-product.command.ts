import { ICommand } from '@nestjs/cqrs';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductCommand implements ICommand {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  constructor(dto: CreateProductCommand) {
    this.name = dto.name;
  }
}
