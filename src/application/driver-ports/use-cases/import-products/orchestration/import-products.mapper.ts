import { ProductImportedDomainEvent } from '@domain-events/product';
import { Injectable } from '@nestjs/common';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
  ProductUnitValueObject,
} from '@value-objects/product';
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
    const unit = ProductUnitValueObject.create(command.unit);

    const domainData: ImportProductsDomainData = {
      name,
      quantity,
      unit,
    };

    return domainData;
  }

  toResponseDTO(event: ProductImportedDomainEvent): ImportProductsResponseDto {
    console.log(event);
    const dto = new ImportProductsResponseDto({
      name: event.name.unpack(),
      quantity: event.quantity.unpack(),
      unit: event.unit.unpack(),
    });

    return dto;
  }
}
