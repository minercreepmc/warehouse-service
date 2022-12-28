import { ProductDomainService } from '@domain-services/product';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'oxide.ts';
import {
  importProductMapperDiToken,
  ImportProductsMapperPort,
} from './orchestration';
import {
  ImportProductsCommand,
  ImportProductsResult,
} from './orchestration/data';
import { ImportProductsBusinessChecker } from './orchestration/import-products.business-checker';
import { ImportProductsValidator } from './orchestration/import-products.validator';

@CommandHandler(ImportProductsCommand)
export class ImportProductsHandler
  implements ICommandHandler<ImportProductsCommand, ImportProductsResult>
{
  constructor(
    @Inject(importProductMapperDiToken)
    private readonly mapper: ImportProductsMapperPort,
    private readonly validator: ImportProductsValidator,
    private readonly businessChecker: ImportProductsBusinessChecker,
    private readonly domainService: ProductDomainService,
  ) {}

  async execute(command: ImportProductsCommand): Promise<ImportProductsResult> {
    this.validator.check(command);
    const isValidCommand = this.validator.isValid();
    if (!isValidCommand) {
      return Err(this.validator.errors);
    }
    const domainData = this.mapper.toDomain(command);

    await this.businessChecker.check(domainData);
    if (!this.businessChecker.isValid()) {
      return Err(this.businessChecker.errors);
    }

    const productImportedEvent = await this.domainService.importProduct(
      domainData,
    );

    return Ok(this.mapper.toResponseDTO(productImportedEvent));
  }
}
