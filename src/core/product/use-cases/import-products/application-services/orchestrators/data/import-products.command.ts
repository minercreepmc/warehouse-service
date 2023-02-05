import { ICommand } from '@nestjs/cqrs';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ImportProductsCommand implements ICommand {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number;

  constructor(dto: any) {
    this.name = dto.name;
    this.quantity = dto.quantity;
  }
}
