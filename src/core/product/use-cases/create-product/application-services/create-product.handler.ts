import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Ok, Err } from 'oxide.ts';
import { ProductDomainService } from '@product-domain-services';
import { CreateProductCommand, CreateProductResult } from './dtos';
import { CreateProductMapper } from './create-product.mapper';
import { CreateProductCommandValidator } from './create-product.command-validator';
import { CreateProductBusinessValidator } from './create-product.business-validator';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand, CreateProductResult>
{
  constructor(
    private readonly mapper: CreateProductMapper,
    private readonly commandValidator: CreateProductCommandValidator,
    private readonly businessValidator: CreateProductBusinessValidator,
    private readonly domainService: ProductDomainService,
  ) {}

  async execute(command: CreateProductCommand): Promise<CreateProductResult> {
    const commandValidated = this.commandValidator.validate(command);
    if (!commandValidated.isValid) {
      return Err(commandValidated.exceptions);
    }

    const domainData = this.mapper.toDomain(command);

    const businessValidated = await this.businessValidator.validate(domainData);

    if (!businessValidated.isValid) {
      return Err(businessValidated.exceptions);
    }

    const productCreatedEvent = await this.domainService.createProduct(
      domainData,
    );

    return Ok(this.mapper.toResponseDTO(productCreatedEvent));
  }
}
