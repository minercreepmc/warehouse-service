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
    const { name, quantity, postponed } = command;
    const nameVo = new ProductNameValueObject(name);
    let quantityVo = new ProductQuantityValueObject(0);
    let postponedVo = new ProductQuantityValueObject(0);

    if (quantity) {
      quantityVo = new ProductQuantityValueObject(quantity);
    }
    if (postponed) {
      postponedVo = new ProductQuantityValueObject(postponed);
    }

    const data: ExportProductsDomainData = {
      name: nameVo,
      quantity: quantityVo,
      postponed: postponedVo,
      isPostponed: command.isPostponed || false,
    };

    return data;
  }

  toResponseDTO(event: ProductsExportedDomainEvent): ExportProductsResponseDto {
    let postponed = 0;
    let quantity = 0;

    if (event.postponed) {
      postponed = event.postponed.unpack();
    }

    if (event.quantity) {
      quantity = event.quantity.unpack();
    }
    const dto = new ExportProductsResponseDto({
      name: event.name.unpack(),
      quantity: quantity,
      postponed: postponed,
      isPostponed: event.isPostponed,
    });
    return dto;
  }
}
