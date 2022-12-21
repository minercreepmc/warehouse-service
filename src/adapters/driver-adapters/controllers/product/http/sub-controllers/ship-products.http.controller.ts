import { ShipProductsRequestDto } from '@driver-adapters/dtos/product';
import { CommandBus } from '@nestjs/cqrs';

export class ShipProductsHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  async execute(dto: ShipProductsRequestDto) {
    console.log('shipProduct');
  }
}
