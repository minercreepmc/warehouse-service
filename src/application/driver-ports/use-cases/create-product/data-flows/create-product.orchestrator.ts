import { ProductCreatedDomainEvent } from '@domain-events/product/product-created';
import { ProductDomainService } from '@domain-services/product/product.domain-service';
import { Injectable } from '@nestjs/common';
import { ProductNameValueObject } from '@value-objects/product';
import { OrchestrateMapper } from 'common-base-classes';
import { CreateProductCommand } from './create-product.command';
import { CreateProductResponseDto } from './create-product.response.dto';

export interface CreateProductOrchestratorPort
  extends OrchestrateMapper<
    ProductCreatedDomainEvent,
    CreateProductCommand,
    CreateProductResponseDto
  > {}

export const createProductOrchestratorDiToken = Symbol(
  'CREATE_PRODUCT_ORCHESTRATOR',
);

@Injectable()
export class CreateProductOrchestrator
  implements CreateProductOrchestratorPort
{
  constructor(private readonly productDomainService: ProductDomainService) {}

  async toDomain(
    command: CreateProductCommand,
  ): Promise<ProductCreatedDomainEvent> {
    const name = ProductNameValueObject.create(command.name);
    const productCreated = await this.productDomainService.createProduct({
      name,
    });

    return productCreated;
  }

  toResponseDTO(domain: ProductCreatedDomainEvent): CreateProductResponseDto {
    const dto = new CreateProductResponseDto(domain.name.unpack());

    return dto;
  }
}
