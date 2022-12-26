import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  createProductBusinessCheckerDiToken,
  CreateProductBusinessCheckerPort,
  createProductMapperDiToken,
  CreateProductMapperPort,
  CreateProductResult,
  createProductValidatorDiToken,
  CreateProductValidatorPort,
} from './orchestration';
import { Ok, Err } from 'oxide.ts';
import { CreateProductCommand } from './orchestration/data';
import { ProductDomainService } from '@domain-services/product';
@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand, CreateProductResult>
{
  constructor(
    @Inject(createProductMapperDiToken)
    private readonly mapper: CreateProductMapperPort,
    @Inject(createProductValidatorDiToken)
    private readonly validator: CreateProductValidatorPort,
    @Inject(createProductBusinessCheckerDiToken)
    private readonly businessChecker: CreateProductBusinessCheckerPort,
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
