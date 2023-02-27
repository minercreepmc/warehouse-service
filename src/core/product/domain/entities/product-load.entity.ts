import {
  ProductLoadBarcodeValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { AbstractEntity, UUID } from 'common-base-classes';
import { Queue } from 'typescript-collections';

export interface ProductLoadEntityDetails {
  quantity: ProductQuantityValueObject;
}

export class ProductLoadEntity extends AbstractEntity<ProductLoadEntityDetails> {
  constructor(
    id: ProductLoadBarcodeValueObject,
    details: ProductLoadEntityDetails,
  ) {
    super({ id, details });
  }

  static create(load: { quantity: number }[]): Queue<ProductLoadEntity> {
    const queue = new Queue<ProductLoadEntity>();
    load.forEach((container) => {
      const quantity = ProductQuantityValueObject.create(container.quantity);
      queue.enqueue(new ProductLoadEntity(UUID.create(), { quantity }));
    });
    return queue;
  }

  shipAmountOfQuantityAndReturnLeftOver(
    amount: ProductQuantityValueObject,
  ): ProductQuantityValueObject {
    if (!this.isEnoughToShip(amount)) {
      const leftOver = amount.remove(this.quantity);
      this.shipAll();
      return leftOver;
    }

    this.quantity = this.quantity.remove(amount);
    return ProductQuantityValueObject.create(0);
  }

  isEnoughToShip(need: ProductQuantityValueObject) {
    return this.quantity.unpack() >= need.unpack();
  }

  shipAll() {
    this.quantity = this.quantity.remove(this.quantity);
  }

  get quantity(): ProductQuantityValueObject {
    return this.details.quantity;
  }

  set quantity(newQuantity: ProductQuantityValueObject) {
    this.details.quantity = newQuantity;
  }
}
