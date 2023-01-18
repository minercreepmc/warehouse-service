import { ProductDomainService } from '@domain-services/product';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Ok, Err } from 'oxide.ts';
import {
  ShipProductsBusinessChecker,
  ShipProductsMapper,
  ShipProductsValidator,
} from './orchestrators';
import { ShipProductsCommand, ShipProductsResult } from './orchestrators/data';

@CommandHandler(ShipProductsCommand)
export class ShipProductsHandler
  implements ICommandHandler<ShipProductsCommand, ShipProductsResult>
{
  constructor(
    private readonly mapper: ShipProductsMapper,
    private readonly validator: ShipProductsValidator,
    private readonly businessChecker: ShipProductsBusinessChecker,
    private readonly domainService: ProductDomainService,
  ) {}
  async execute(command: ShipProductsCommand): Promise<ShipProductsResult> {
    this.validator.clearNoteAndCheck(command);
    const isValidCommand = this.validator.isValid();
    if (!isValidCommand) {
      return Err(this.validator.errors);
    }
    const shipDomainData = this.mapper.toDomain(command);

    await this.businessChecker.clearNoteAndCheck(shipDomainData);
    if (!this.businessChecker.isValid()) {
      return Err(this.businessChecker.errors);
    }

    const productsShippedEvent = await this.domainService.shipProducts(
      shipDomainData,
    );

    return Ok(this.mapper.toResponseDTO(productsShippedEvent));
  }
}
