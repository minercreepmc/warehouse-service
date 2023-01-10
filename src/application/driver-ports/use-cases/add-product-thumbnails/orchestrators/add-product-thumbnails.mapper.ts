import { ProductThumbnailsAddedDomainEvent } from '@domain-events/product/thumbnail-added';
import {
  ProductNameValueObject,
  ProductThumbnailPathValueObject,
} from '@value-objects/product';
import { OrchestrateMapper } from 'common-base-classes';
import {
  AddProductThumbnailsCommand,
  AddProductThumbnailsDomainData,
  AddProductThumbnailsResponseDto,
} from './data';

export class AddProductThumbnailsMapper
  implements
    OrchestrateMapper<
      AddProductThumbnailsDomainData,
      AddProductThumbnailsCommand,
      AddProductThumbnailsResponseDto
    >
{
  toDomain(
    command: AddProductThumbnailsCommand,
  ): AddProductThumbnailsDomainData {
    const productName = ProductNameValueObject.create(command.productName);
    const productThumbnails = command.thumbnailPaths.map((thumbnail) =>
      ProductThumbnailPathValueObject.create(thumbnail),
    );
    const domainData: AddProductThumbnailsDomainData = {
      name: productName,
      thumbnails: productThumbnails,
    };

    return domainData;
  }

  toResponseDTO(
    domain: ProductThumbnailsAddedDomainEvent,
  ): AddProductThumbnailsResponseDto {
    const dto = new AddProductThumbnailsResponseDto({
      productName: domain.productName.unpack(),
      paths: domain.thumbnails.map((thumbnail) => thumbnail.unpack()),
    });

    return dto;
  }
}
