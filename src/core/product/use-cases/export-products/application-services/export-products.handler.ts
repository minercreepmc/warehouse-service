import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductDomainService } from '@product-domain-services';
import { Ok, Err } from 'oxide.ts';
import { ExportProductsCommand, ExportProductsResult } from './dtos';
import { ExportProductsBusinessValidator } from './export-products.business-validator';
import { ExportProductsCommandValidator } from './export-products.command-validator';
import { ExportProductsMapper } from './export-products.mapper';

@CommandHandler(ExportProductsCommand)
export class ShipProductsHandler
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
    const shipDomainData = this.mapper.toDomain(command);

    const domainValidated = await this.businessValidator.validate(
      shipDomainData,
    );
    if (!domainValidated.isValid) {
      return Err(domainValidated.exceptions);
    }

    const productsShippedEvent = await this.domainService.shipProducts(
      shipDomainData,
    );

    return Ok(this.mapper.toResponseDTO(productsShippedEvent));
  }
}
