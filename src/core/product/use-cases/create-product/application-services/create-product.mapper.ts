import { Injectable } from '@nestjs/common';
import { ProductCreatedDomainEvent } from '@product-domain-events';
import { ProductNameValueObject } from '@product-value-object';
import {
  CreateProductCommand,
  CreateProductDomainData,
  CreateProductResponseDto,
} from './dtos';

@Injectable()
export class CreateProductMapper {
  toDomain(command: CreateProductCommand): CreateProductDomainData {
    const name = new ProductNameValueObject(command.name);
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
