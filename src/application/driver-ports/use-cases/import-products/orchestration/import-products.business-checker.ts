import {
  ProductBusinessError,
  ProductDomainError,
} from '@domain-errors/product';
import { ProductDomainService } from '@domain-services/product';
import { Injectable } from '@nestjs/common';
import { AbstractNotificationWrapper } from 'common-base-classes';
import { ImportProductsDomainData } from './data';

@Injectable()
export class ImportProductsBusinessChecker extends AbstractNotificationWrapper<ProductBusinessError> {
  constructor(private readonly domainService: ProductDomainService) {
    super();
  }

  async check(domainData: ImportProductsDomainData): Promise<void> {
    const found = await this.domainService.isProductExist(domainData.name);
    if (!found) {
      this.note.addNote(new ProductDomainError.NameIsNotExist());
    }
  }
}
