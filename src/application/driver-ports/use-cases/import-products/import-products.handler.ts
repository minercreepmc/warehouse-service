import { ProductDomainService } from '@domain-services/product';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'oxide.ts';
import {
  importProductMapperDiToken,
  ImportProductsBusinessChecker,
  ImportProductsMapperPort,
  ImportProductsValidator,
} from './orchestrators';
import {
  ImportProductsCommand,
  ImportProductsResult,
} from './orchestrators/data';

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
    this.validator.clearNoteAndCheck(command);
    const isValidCommand = this.validator.isValid();
    if (!isValidCommand) {
      return Err(this.validator.errors);
    }
    const domainData = this.mapper.toDomain(command);

    await this.businessChecker.clearNoteAndCheck(domainData);
    if (!this.businessChecker.isValid()) {
      return Err(this.businessChecker.errors);
    }

    const productImportedEvent = await this.domainService.importProducts(
      domainData,
    );

    return Ok(this.mapper.toResponseDTO(productImportedEvent));
  }
}
