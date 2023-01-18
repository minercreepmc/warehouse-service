import { AddThumbnailsAggregateData } from '@aggregates/product';
import { ProductDomainError } from '@domain-errors/product';
import { ProductEventStorePort } from '@gateway/driven-ports/product';

export interface AddProductThumbnailsDomainServiceData
  extends AddThumbnailsAggregateData {}

export class AddProductThumbnailsDomainService {
  constructor(private readonly eventStore: ProductEventStorePort) {}

  async execute(data: AddProductThumbnailsDomainServiceData) {
    const product = await this.eventStore.getProduct(data.name);
    if (!product) {
      throw new ProductDomainError.NameIsNotExist();
    }

    const thumbnailAdded = product.addThumbnails(data);

    await this.eventStore.save(thumbnailAdded);

    // const message = this.mapper.toMessage(thumbnailAdded);
    // this.messageBroker.emit(ProductThumbnailsAddedDomainEvent.name, message);
    return thumbnailAdded;
  }
}
