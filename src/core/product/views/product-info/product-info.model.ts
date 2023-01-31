import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
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

  constructor(data: ProductInfoModelData) {
    super({ id: data.id });
    this.name = data.name;
    this.quantity = data.quantity || 0;
  }
}
