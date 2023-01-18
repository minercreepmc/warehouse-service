import { ProductsShippedDomainEvent } from '@domain-events/product';
import { Injectable } from '@nestjs/common';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@value-objects/product';
import { OrchestrateMapper } from 'common-base-classes';
import { ShipProductsCommand, ShipProductsResponseDto } from './data';
import { ShipProductsDomainData } from './data/ship-products.domain-data';

export interface IShipProductsMapper
  extends OrchestrateMapper<
    ShipProductsDomainData,
    ShipProductsCommand,
    ShipProductsResponseDto
  > {}

@Injectable()
export class ShipProductsMapper implements IShipProductsMapper {
  toDomain(command: ShipProductsCommand): ShipProductsDomainData {
    const name = ProductNameValueObject.create(command.name);
    const quantity = ProductQuantityValueObject.create(command.quantity);

    const data: ShipProductsDomainData = {
      name,
      quantity: quantity,
    };

    return data;
  }

  toResponseDTO(event: ProductsShippedDomainEvent): ShipProductsResponseDto {
    const dto = new ShipProductsResponseDto({
      name: event.name.unpack(),
      quantity: event.quantity.unpack(),
    });
    return dto;
  }
}
