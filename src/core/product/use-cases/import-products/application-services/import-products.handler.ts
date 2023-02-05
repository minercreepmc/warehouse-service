import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductDomainService } from '@product-domain-services';
import { Err, Ok } from 'oxide.ts';
import {
  ImportProductsBusinessChecker,
  ImportProductsMapper,
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
    private readonly mapper: ImportProductsMapper,
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

    const productsImportedEvent = await this.domainService.importProducts(
      domainData,
    );

    return Ok(this.mapper.toResponseDTO(productsImportedEvent));
  }
}
