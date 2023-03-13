import { ICommand } from '@nestjs/cqrs';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ExportProductsCommand implements ICommand {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  constructor(dto: any) {
    this.name = dto.name;
    this.quantity = dto.quantity;
  }
}
