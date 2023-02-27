import { UsePipes } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WarehouseDomainService } from '@warehouse-domain-services';
import { CreateWarehouseMapper } from './create-warehouse.mapper';
import { CreateWarehouseBusinessValidator } from './create-warehouse.business-validator';
import { CreateWarehouseCommandValidator } from './create-warehouse.command-validator';
import { CreateWarehouseCommand, CreateWarehouseResult } from './dtos';
import { Err, Ok } from 'oxide.ts';

@CommandHandler(CreateWarehouseCommand)
export class CreateWarehouseHandler
  implements ICommandHandler<CreateWarehouseCommand, CreateWarehouseResult>
{
  constructor(
    private readonly warehouseDomainService: WarehouseDomainService,
    private readonly businessValidator: CreateWarehouseBusinessValidator,
    private readonly mapper: CreateWarehouseMapper,
  ) {}

  @UsePipes(new CreateWarehouseCommandValidator())
  async execute(
    command: CreateWarehouseCommand,
  ): Promise<CreateWarehouseResult> {
    const domainData = this.mapper.toCreateWarehouseDomain(command);

    await this.businessValidator.validate(domainData);

    if (!this.businessValidator.isValid()) {
      return Err(this.businessValidator.errors);
    }

    const warehouseCreatedEvent =
      await this.warehouseDomainService.createWarehouse(domainData);

    return Ok(this.mapper.toResponseDto(warehouseCreatedEvent));
  }
}
