import { Inject, Injectable } from '@nestjs/common';
import {
  productEventStoreDiToken,
  ProductEventStorePort,
} from '@product-gateway/driven-ports';
import type {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import {
  IsEnoughToShipSpecification,
  IsProductNameExistSpecification,
} from './specifications';

@Injectable()
export class ProductBusinessRules {
  constructor(
    @Inject(productEventStoreDiToken)
    private readonly productEventStore: ProductEventStorePort,
  ) {}
  isProductNameExist(productName: ProductNameValueObject) {
    const spec = new IsProductNameExistSpecification(this.productEventStore);
    return spec.isSatisfiedBy(productName);
  }

  async isEnoughToShip(
    productName: ProductNameValueObject,
    productQuantity: ProductQuantityValueObject,
  ) {
    const spec = new IsEnoughToShipSpecification(this.productEventStore);
    return spec.isSatisfiedBy(productName, productQuantity);
  }
}
