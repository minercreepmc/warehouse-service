import { Injectable } from '@nestjs/common';
import { ProductsImportedDomainEvent } from '@product-domain-events';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { OrchestrateMapper } from 'common-base-classes';
import {
  ImportProductsCommand,
  ImportProductsDomainData,
  ImportProductsResponseDto,
} from './data';

export interface ImportProductsMapperPort
  extends OrchestrateMapper<
    ImportProductsDomainData,
    ImportProductsCommand,
    ImportProductsResponseDto
  > {}

export const importProductMapperDiToken = Symbol('IMPORT_PRODUCT_MAPPER');

@Injectable()
export class ImportProductsMapper implements ImportProductsMapperPort {
  toDomain(command: ImportProductsCommand): ImportProductsDomainData {
    const name = ProductNameValueObject.create(command.name);
    const quantity = ProductQuantityValueObject.create(command.quantity);

    const domainData: ImportProductsDomainData = {
      name,
      quantity,
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
