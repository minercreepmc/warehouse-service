import { Injectable } from '@nestjs/common';
import { ProductCreatedDomainEvent } from '@product-domain-events';
import { ProductNameValueObject } from '@product-value-object';
import { OrchestrateMapper } from 'common-base-classes';
import {
  CreateProductCommand,
  CreateProductDomainData,
  CreateProductResponseDto,
} from './data';

export interface CreateProductMapperPort
  extends OrchestrateMapper<
    CreateProductDomainData,
    CreateProductCommand,
    CreateProductResponseDto
  > {}

export const createProductMapperDiToken = Symbol('CREATE_PRODUCT_MAPPER');

@Injectable()
export class CreateProductMapper implements CreateProductMapperPort {
  toDomain(command: CreateProductCommand): CreateProductDomainData {
    const name = ProductNameValueObject.create(command.name);
    const domainData: CreateProductDomainData = {
      name,
    };

    return domainData;
  }

  toResponseDTO(domain: ProductCreatedDomainEvent): CreateProductResponseDto {
    const dto = new CreateProductResponseDto(domain.name.unpack());

    return dto;
  }
}
