import { ProductCreatedDomainEventMessageDto } from '../gateway/channel';

export interface ProductInfoServiceCreateData
  extends ProductCreatedDomainEventMessageDto {}

export interface ProductInfoServiceUpdateData {
  productId: string;
  name: string;
  quantity: number;
}
