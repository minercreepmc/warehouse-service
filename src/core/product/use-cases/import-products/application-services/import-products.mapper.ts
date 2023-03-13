import { Injectable } from '@nestjs/common';
import { ProductsImportedDomainEvent } from '@product-domain-events';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import {
  ImportProductsCommand,
  ImportProductsDomainData,
  ImportProductsResponseDto,
} from './dtos';

@Injectable()
export class ImportProductsMapper {
  toDomain(command: ImportProductsCommand): ImportProductsDomainData {
    const { name, quantity } = command;
    const nameVo = new ProductNameValueObject(name);
    const quantityVo = new ProductQuantityValueObject(quantity);

    const domainData: ImportProductsDomainData = {
      name: nameVo,
      quantity: quantityVo,
    };

    return domainData;
  }

  toResponseDTO(event: ProductsImportedDomainEvent): ImportProductsResponseDto {
    const dto = new ImportProductsResponseDto({
      name: event.name.unpack(),
      quantity: event.quantity.unpack(),
    });

    return dto;
  }
}
