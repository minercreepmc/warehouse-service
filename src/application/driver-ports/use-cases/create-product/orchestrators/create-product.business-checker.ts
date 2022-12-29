import {
  ProductBusinessError,
  ProductDomainError,
} from '@domain-errors/product';
import { ProductDomainService } from '@domain-services/product';
import { Injectable } from '@nestjs/common';
import { ProductNameValueObject } from '@value-objects/product';
import { Notification } from 'common-base-classes';
import { CreateProductDomainData } from './data';

export interface CreateProductBusinessCheckerPort {
  isValid(domainData: CreateProductDomainData): Promise<boolean>;
  get errors(): ProductBusinessError[];
}

export const createProductBusinessCheckerDiToken = Symbol(
  'CREATE_PRODUCT_BUSINESS_CHECKER',
);

@Injectable()
export class CreateProductBusinessChecker
  implements CreateProductBusinessCheckerPort
{
  private readonly note = new Notification<ProductBusinessError>();
  constructor(private readonly productDomainService: ProductDomainService) {}

  async isValid(domainData: CreateProductDomainData): Promise<boolean> {
    await this.checkNameExistence(domainData.name);

    return !this.note.hasNote();
  }

  private async checkNameExistence(name: ProductNameValueObject) {
    const found = await this.productDomainService.isProductExist(name);
    if (found) {
      this.note.addNote(new ProductDomainError.NameIsExist());
    }
  }

  get errors(): ProductBusinessError[] {
    if (!this.note.hasNote()) {
      throw new Error(`Cannot get errors of success domain data`);
    }
    return this.note.getNotes();
  }
}
