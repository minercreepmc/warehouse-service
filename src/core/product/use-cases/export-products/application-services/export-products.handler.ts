import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductDomainService } from '@product-domain-services';
import { Ok, Err } from 'oxide.ts';
import { ExportProductsCommand, ExportProductsResult } from './dtos';
import { ExportProductsBusinessValidator } from './export-products.business-validator';
import { ExportProductsCommandValidator } from './export-products.command-validator';
import { ExportProductsMapper } from './export-products.mapper';

@CommandHandler(ExportProductsCommand)
export class ExportProductsHandler
  implements ICommandHandler<ExportProductsCommand, ExportProductsResult>
{
  constructor(
    private readonly mapper: ExportProductsMapper,
    private readonly commandValidator: ExportProductsCommandValidator,
    private readonly businessValidator: ExportProductsBusinessValidator,
    private readonly domainService: ProductDomainService,
  ) {}
  async execute(command: ExportProductsCommand): Promise<ExportProductsResult> {
    const commandValidated = this.commandValidator.validate(command);
    if (!commandValidated.isValid) {
      return Err(commandValidated.exceptions);
    }
    const exportDomainData = this.mapper.toDomain(command);

    const domainValidated = await this.businessValidator.validate(
      exportDomainData,
    );
    if (!domainValidated.isValid) {
      return Err(domainValidated.exceptions);
    }

    const productsExportedEvent = await this.domainService.exportProducts(
      exportDomainData,
    );

    return Ok(this.mapper.toResponseDTO(productsExportedEvent));
  }
}
