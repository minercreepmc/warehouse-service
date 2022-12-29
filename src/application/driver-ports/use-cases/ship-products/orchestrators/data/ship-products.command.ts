import { ICommand } from '@nestjs/cqrs';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ShipProductsCommand implements ICommand {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  unit: string;

  constructor(dto: any) {
    this.name = dto.name;
    this.quantity = dto.quantity;
    this.unit = dto.unit;
  }
}
