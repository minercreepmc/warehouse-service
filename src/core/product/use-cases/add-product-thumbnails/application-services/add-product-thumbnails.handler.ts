import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductDomainService } from '@product-domain-services';
import { Err, Ok } from 'oxide.ts';
import {
  AddProductThumbnailsMapper,
  AddProductThumbnailsValidator,
} from './orchestrators';
import {
  AddProductsThumbnailsCommand,
  AddProductThumbnailsResult,
} from './orchestrators/data';

@CommandHandler(AddProductsThumbnailsCommand)
export class AddProductThumbnailsHandler
  implements
    ICommandHandler<AddProductsThumbnailsCommand, AddProductThumbnailsResult>
{
  constructor(
    private readonly validator: AddProductThumbnailsValidator,
    private readonly mapper: AddProductThumbnailsMapper,
    private readonly domainService: ProductDomainService,
  ) {}
  async execute(
    command: AddProductsThumbnailsCommand,
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
