import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  CreateProductBusinessChecker,
  CreateProductMapper,
  CreateProductResult,
  CreateProductValidator,
} from './orchestrators';
import { Ok, Err } from 'oxide.ts';
import { CreateProductCommand } from './orchestrators/data';
import { ProductDomainService } from '@product-domain-services';
@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand, CreateProductResult>
{
  constructor(
    private readonly mapper: CreateProductMapper,
    private readonly validator: CreateProductValidator,
    private readonly businessChecker: CreateProductBusinessChecker,
    private readonly domainService: ProductDomainService,
  ) {}

  async execute(command: CreateProductCommand): Promise<CreateProductResult> {
    //validate
    this.validator.clearNoteAndCheck(command);
    if (!this.validator.isValid()) {
      return Err(this.validator.errors);
    }

    const domainData = this.mapper.toDomain(command);
    await this.businessChecker.clearNoteAndCheck(domainData);

    if (!this.businessChecker.isValid()) {
      return Err(this.businessChecker.errors);
    }

    const productCreatedEvent = await this.domainService.createProduct(
      domainData,
    );

    // business check
    return Ok(this.mapper.toResponseDTO(productCreatedEvent));
  }
}
