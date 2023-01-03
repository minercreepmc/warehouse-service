export interface ProductDomainEventMessageDto {
  productId: string;
  name?: string;
  quantity?: number;
  unit?: string;
}

export interface ProductCreatedDomainEventMessageDto {
  productId: string;
  name: string;
}
