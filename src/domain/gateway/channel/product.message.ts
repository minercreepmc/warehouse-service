import { AbstractMessageDto } from 'common-base-classes';

export interface ProductDomainEventMessageDto extends AbstractMessageDto {
  productId: string;
  name?: string;
  quantity?: number;
  unit?: string;
  thumbnails?: string[];
}

export interface ProductCreatedDomainEventMessageDto {
  productId: string;
  name: string;
}

export interface ProductsImportedDomainEventMessageDto {
  productId: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface ProductShippedDomainEventMessageDto {
  productId: string;
  name: string;
  quantity: number;
  unit: string;
}
