import { ProductDomainService } from '@domain-services/product';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'oxide.ts';
import {
  AddProductThumbnailsMapper,
  AddProductThumbnailsValidator,
} from './orchestrators';
import {
  AddProductThumbnailsCommand,
  AddProductThumbnailsResult,
} from './orchestrators/data';

@CommandHandler(AddProductThumbnailsCommand)
export class AddProductThumbnailsHandler
  implements
    ICommandHandler<AddProductThumbnailsCommand, AddProductThumbnailsResult>
{
  constructor(
    private readonly validator: AddProductThumbnailsValidator,
    private readonly mapper: AddProductThumbnailsMapper,
    private readonly domainService: ProductDomainService,
  ) {}
  async execute(
    command: AddProductThumbnailsCommand,
  ): Promise<AddProductThumbnailsResult> {
    this.validator.clearNoteAndCheck(command);
    if (!this.validator.isValid()) {
      return Err(this.validator.errors);
    }

    const domainData = this.mapper.toDomain(command);
    const thumbnailAdded = await this.domainService.addProductThumbnails(
      domainData,
    );

    return Ok(this.mapper.toResponseDTO(thumbnailAdded));
  }
}
