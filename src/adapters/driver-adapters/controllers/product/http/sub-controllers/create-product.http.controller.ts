import { CreateProductRequestDto } from '@driver-adapters/dtos/product';
import { CreateProductCommand } from '@driver-ports/use-cases/create-product/data-flows';
import { CommandBus } from '@nestjs/cqrs';

export class CreateProductHttpController {
  constructor(private readonly commandBus: CommandBus) {}
  async execute(dto: CreateProductRequestDto) {
    const command = new CreateProductCommand(dto);

    const result = await this.commandBus.execute(command);

    return result;
  }
}
