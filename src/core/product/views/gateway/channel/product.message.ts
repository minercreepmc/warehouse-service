export interface ProductDomainEventMessageDto {
  productId: string;
  name?: string;
  quantity?: number;
}

export interface ProductCreatedDomainEventMessageDto {
  productId: string;
  name: string;
}

export type ProductsImportedDomainEventMessageDto =
  Required<ProductDomainEventMessageDto>;

export type ProductsExportedDomainEventMessageDto =
  Required<ProductDomainEventMessageDto>;
