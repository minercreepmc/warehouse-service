import { ICommand } from '@nestjs/cqrs';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateWarehouseCommand implements ICommand {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  readonly location: CreateWarehouseLocation;
  @IsNotEmpty()
  @IsNumber()
  readonly capacity: CreateWarehouseCapacity;
}

export type CreateWarehouseLocation =
  | CreateWarehouseAddress
  | CreateWarehouseCordinates;

export class CreateWarehouseCapacity {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  readonly unit: string[];
  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;
}

export class CreateWarehouseAddress {
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsNotEmpty()
  @IsNumber()
  postalCode: number;

  @IsNotEmpty()
  @IsString()
  province: string;

  @IsNotEmpty()
  @IsString()
  ward?: string;

  @IsNotEmpty()
  @IsString()
  street?: string;
}

export class CreateWarehouseCordinates {
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;
}
