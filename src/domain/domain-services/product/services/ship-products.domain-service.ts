import { ShipProductsAggregateData } from '@aggregates/product';
import { ProductDomainError } from '@domain-errors/product';
import type { ProductsShippedDomainEvent } from '@domain-events/product';
import { ProductEventStorePort } from '@gateway/driven-ports/product';

export interface ShipProductsDomainServiceData
  extends ShipProductsAggregateData {}

export class ShipProductsDomainService {
  constructor(private readonly eventStore: ProductEventStorePort) {}

  async execute(
    data: ShipProductsDomainServiceData,
  ): Promise<ProductsShippedDomainEvent> {
    const product = await this.eventStore.getProduct(data.name);
    if (!product) {
      throw new ProductDomainError.NameIsNotExist();
    }

    if (product.quantity.unpack() < data.quantity.unpack()) {
      throw new ProductDomainError.QuantityIsNotEnough();
    }

    const productShippedEvent = product.shipProducts(data);
    this.eventStore.save(productShippedEvent);
    // publish event;

    return productShippedEvent;
  }
}
