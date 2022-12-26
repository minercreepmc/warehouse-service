import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand, CreateProductResponseDto } from './data-flows';
import {
  CreateProductOrchestratorPort,
  createProductOrchestratorDiToken,
} from './data-flows/create-product.orchestrator';
import { CreateProductValidatorPort } from './data-flows/create-product.validator';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand, CreateProductResponseDto>
{
  constructor(
    @Inject(createProductOrchestratorDiToken)
    private readonly orchestrator: CreateProductOrchestratorPort,
    private readonly validator: CreateProductValidatorPort,
  ) {}

  async execute(
    command: CreateProductCommand,
  ): Promise<CreateProductResponseDto> {
    //validate
    const isValidCommand = this.validator.isValid(command);
    if (isValidCommand)
      const productCreated = await this.orchestrator.toDomain(command);

    // business check
    return this.orchestrator.toResponseDTO(productCreated);
  }
}
