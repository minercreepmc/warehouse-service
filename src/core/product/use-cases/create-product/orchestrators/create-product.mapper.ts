import { Injectable } from '@nestjs/common';
import { ProductCreatedDomainEvent } from '@product-domain-events';
import { ProductNameValueObject } from '@product-value-object';
import { OrchestrateMapper } from 'common-base-classes';
import {
  CreateProductCommand,
  CreateProductDomainData,
  CreateProductResponse,
} from './data';

export interface CreateProductMapperPort
  extends OrchestrateMapper<
    CreateProductDomainData,
    CreateProductCommand,
    CreateProductResponse
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

  toResponseDTO(domain: ProductCreatedDomainEvent): CreateProductResponse {
    const dto = new CreateProductResponse(domain.name.unpack());

    return dto;
  }
}
