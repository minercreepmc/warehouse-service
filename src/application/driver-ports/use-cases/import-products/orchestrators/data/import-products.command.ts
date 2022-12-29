import { ICommand } from '@nestjs/cqrs';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ImportProductsCommand implements ICommand {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number;

  @IsNotEmpty()
  @IsString()
  readonly unit: string;

  constructor(dto: any) {
    this.name = dto.name;
    this.quantity = dto.quantity;
    this.unit = dto.unit;
  }
}
