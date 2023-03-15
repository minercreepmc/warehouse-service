import { ProductCreatedDomainEventMessageDto } from '../gateway/channel';

export interface CreateProductInfoOptions
  extends ProductCreatedDomainEventMessageDto {}

export interface UpdateProductInfoServiceOptions {
  productId: string;
  name: string;
  quantity: number;
}
