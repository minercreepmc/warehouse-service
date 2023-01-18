import { ArgumentInvalidExeception } from '@tinphamm/common-exceptions';
import { ProductQuantityValueObject } from '@value-objects/product';
import { AbstractEntity, ID, UUID } from 'common-base-classes';
import { Queue } from 'typescript-collections';

export interface ProductContainersEntityDetails {
  quantity: ProductQuantityValueObject;
}

export class ProductContainerEntity extends AbstractEntity<ProductContainersEntityDetails> {
  constructor(id: ID, details: ProductContainersEntityDetails) {
    super({ id, details });
  }

  static create(
    containers: { quantity: number }[],
  ): Queue<ProductContainerEntity> {
    const queue = new Queue<ProductContainerEntity>();
    containers.forEach((container) => {
      const quantity = ProductQuantityValueObject.create(container.quantity);
      queue.enqueue(new ProductContainerEntity(UUID.create(), { quantity }));
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
