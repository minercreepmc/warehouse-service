import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { AbstractReadModel } from 'common-base-classes';

export interface ProductInfoModelData {
  id: string;
  name: string;
  quantity?: number;
}

@ObjectType()
export class ProductInfoModel extends AbstractReadModel {
  @IsNotEmpty()
  @IsString()
  @Field()
  @ApiProperty({
    example: 'Banana',
  })
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  @ApiProperty({
    example: 12,
  })
  quantity: number;

  @IsNotEmpty()
  @IsUUID()
  @Field()
  @ApiProperty({
    example: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
  })
  id: string;

  @IsNotEmpty()
  @IsDate()
  @Field()
  @ApiProperty({
    example: 'Sun Jan 01 2022 12:30:00 GMT-0700',
  })
  createdAt?: Date;

  @IsNotEmpty()
  @IsDate()
  @Field()
  @ApiProperty({
    example: 'Sun Jan 01 2022 12:30:00 GMT-0700',
  })
  updatedAt?: Date;

  constructor(data: ProductInfoModelData) {
    super({ id: data.id });
    this.name = data.name;
    this.quantity = data.quantity || 0;
  }
}
