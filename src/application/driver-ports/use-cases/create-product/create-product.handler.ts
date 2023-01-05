import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  CreateProductBusinessChecker,
  CreateProductMapper,
  CreateProductResult,
  CreateProductValidator,
} from './orchestrators';
import { Ok, Err } from 'oxide.ts';
import { CreateProductCommand } from './orchestrators/data';
import { ProductDomainService } from '@domain-services/product';
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
    const isValidCommand = this.validator.isValid(command);
    if (!isValidCommand) {
      return Err(this.validator.errors);
    }

    const domainData = this.mapper.toDomain(command);
    const isValidDomainData = await this.businessChecker.isValid(domainData);

    if (!isValidDomainData) {
      return Err(this.businessChecker.errors);
    }

    const productCreatedEvent = await this.domainService.createProduct(
      domainData,
    );

    // business check
    return Ok(this.mapper.toResponseDTO(productCreatedEvent));
  }
}
