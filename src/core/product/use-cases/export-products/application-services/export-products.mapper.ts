import { Injectable } from '@nestjs/common';
import { ProductsExportedDomainEvent } from '@product-domain-events';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import {
  ExportProductsCommand,
  ExportProductsDomainData,
  ExportProductsResponseDto,
} from './dtos';

@Injectable()
export class ExportProductsMapper {
  toDomain(command: ExportProductsCommand): ExportProductsDomainData {
    const { name, quantity } = command;
    const nameVo = new ProductNameValueObject(name);
    const quantityVo = new ProductQuantityValueObject(quantity);

    const data: ExportProductsDomainData = {
      name: nameVo,
      quantity: quantityVo,
    };

    return data;
  }

  toResponseDTO(event: ProductsExportedDomainEvent): ExportProductsResponseDto {
    const dto = new ExportProductsResponseDto({
      name: event.name.unpack(),
      quantity: event.quantity.unpack(),
    });
    return dto;
  }
}
