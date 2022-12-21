import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand, CreateProductResponseDto } from './data-flows';
import {
  CreateProductOrchestratorPort,
  createProductOrchestratorDiToken,
} from './data-flows/create-product.orchestrator';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand, CreateProductResponseDto>
{
  constructor(
    @Inject(createProductOrchestratorDiToken)
    private readonly orchestrator: CreateProductOrchestratorPort,
  ) {}

  async execute(
    command: CreateProductCommand,
  ): Promise<CreateProductResponseDto> {
    //validate
    const productCreated = await this.orchestrator.toDomain(command);

    // business check
    return this.orchestrator.toResponseDTO(productCreated);
  }
}
