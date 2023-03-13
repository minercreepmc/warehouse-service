import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductDomainService } from '@product-domain-services';
import { Err, Ok } from 'oxide.ts';
import { ImportProductsCommand, ImportProductsResult } from './dtos';
import { ImportProductsBusinessValidator } from './import-products.business-validator';
import { ImportProductsCommandValidator } from './import-products.command-validator';
import { ImportProductsMapper } from './import-products.mapper';

@CommandHandler(ImportProductsCommand)
export class ImportProductsHandler
  implements ICommandHandler<ImportProductsCommand, ImportProductsResult>
{
  constructor(
    private readonly mapper: ImportProductsMapper,
    private readonly commandValidator: ImportProductsCommandValidator,
    private readonly businessValidator: ImportProductsBusinessValidator,
    private readonly domainService: ProductDomainService,
  ) {}

  async execute(command: ImportProductsCommand): Promise<ImportProductsResult> {
    const commandValidated = this.commandValidator.validate(command);
    if (!commandValidated.isValid) {
      return Err(commandValidated.exceptions);
    }
    const domainData = this.mapper.toDomain(command);

    const domainValidated = await this.businessValidator.validate(domainData);
    if (!domainValidated.isValid) {
      return Err(domainValidated.exceptions);
    }

    const productsImportedEvent = await this.domainService.importProducts(
      domainData,
    );

    return Ok(this.mapper.toResponseDTO(productsImportedEvent));
  }
}
