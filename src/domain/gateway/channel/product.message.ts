import { AbstractMessageDto } from 'common-base-classes';

export interface ProductDomainEventMessageDto extends AbstractMessageDto {
  productId: string;
  name?: string;
  quantity?: number;
  unit?: string;
}

export interface ProductCreatedDomainEventMessageDto {
  productId: string;
  name: string;
}

export type ProductsImportedDomainEventMessageDto =
  Required<ProductDomainEventMessageDto>;
