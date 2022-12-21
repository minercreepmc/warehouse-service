import { ImportProductsRequestDto } from '@driver-adapters/dtos/product';
import { CommandBus } from '@nestjs/cqrs';

export class ImportProductsHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  async execute(dto: ImportProductsRequestDto) {
    // const command = new ImportProductsCommand(dto);
    // const response = await this.commandBus.execute(command);
    console.log('import product');
  }
}
