import { AbstractValueObject } from 'common-base-classes';

export interface ProductInfoDetails {
  isPostponedForExport: boolean;
}

export class ProductInfoValueObject extends AbstractValueObject<ProductInfoDetails> {
  constructor(details: ProductInfoDetails) {
    super(details);
  }
}
