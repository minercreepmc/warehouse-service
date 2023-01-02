export interface ProductDomainEventMessageDto {
  name?: string;
  quantity?: number;
  unit?: string;
}

export interface ProductCreatedDomainEventMessageDto {
  name: string;
}
