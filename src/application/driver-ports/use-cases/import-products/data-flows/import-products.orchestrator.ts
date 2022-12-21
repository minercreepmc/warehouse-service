// import { ProductImportedDomainEvent } from '@domain-events/product/product-imported';
// import { ProductDomainService } from '@domain-services/product/product.domain-service';
// import { Injectable } from '@nestjs/common';
// import {
//   ProductNameValueObject,
//   ProductQuantityValueObject,
//   ProductUnitValueObject,
// } from '@value-objects/product';
// import { OrchestrateMapper } from 'common-base-classes';
// import { ImportProductsCommand } from './import-products.command';
// import { ImportProductsResponseDto } from './import-products.response.dto';
//
// export interface ImportProductsOrchestratorPort
//   extends OrchestrateMapper<
//     ProductImportedDomainEvent,
//     ImportProductsCommand,
//     ImportProductsResponseDto
//   > {}
//
// export const importProductOrcherstratorDiToken = Symbol(
//   'IMPORT_PRODUCT_ORCHESTRATOR',
// );
//
// @Injectable()
// export class ImportProductsOrchestrator
//   implements ImportProductsOrchestratorPort
// {
//   constructor(private readonly productDomainService: ProductDomainService) {}
//
//   async toDomain(command: ImportProductsCommand) {
//     const name = ProductNameValueObject.create(command.name);
//     const quantity = ProductQuantityValueObject.create(command.quantity);
//     const unit = ProductUnitValueObject.create(command.unit);
//
//     const productCreated = await this.productDomainService.importProduct({
//       name,
//       quantity,
//       unit,
//     });
//     console.log('test');
//   }
//
//   toResponseDTO(
//     product: ProductImportedDomainEvent,
//   ): ImportProductsResponseDto {
//     const dto = new ImportProductsResponseDto({
//       name: product.name.unpack(),
//       quantity: product.quantity.unpack(),
//       unit: product.unit.unpack(),
//     });
//
//     return dto;
//   }
// }
