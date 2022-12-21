// import { Inject } from '@nestjs/common';
// import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// import {
//   importProductOrcherstratorDiToken,
//   ImportProductsOrchestratorPort,
//   ImportProductsResponseDto,
// } from './data-flows';
// import { ImportProductsCommand } from './data-flows/import-products.command';
//
// @CommandHandler(ImportProductsCommand)
// export class ImportProductsHandler
//   implements ICommandHandler<ImportProductsCommand, ImportProductsResponseDto>
// {
//   constructor(
//     @Inject(importProductOrcherstratorDiToken)
//     private readonly mapper: ImportProductsOrchestratorPort,
//   ) {}
//
//   async execute(
//     command: ImportProductsCommand,
//   ): Promise<ImportProductsResponseDto> {
//     // validation
//     const productCreated = await this.mapper.toDomain(command);
//     // business check
//
//     return this.mapper.toResponseDTO(productCreated);
//   }
// }
