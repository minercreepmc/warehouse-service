import { ProductThumbnailsAddedDomainEvent } from '@product-domain-events';
import {
  ProductNameValueObject,
  ProductThumbnailPathValueObject,
} from '@product-value-object';
import { OrchestrateMapper } from 'common-base-classes';
import {
  AddProductsThumbnailsCommand,
  AddProductThumbnailsDomainData,
  AddProductThumbnailsResponseDto,
} from './data';

export class AddProductThumbnailsMapper
  implements
    OrchestrateMapper<
      AddProductThumbnailsDomainData,
      AddProductsThumbnailsCommand,
      AddProductThumbnailsResponseDto
    >
{
  toDomain(
    command: AddProductsThumbnailsCommand,
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
      thumbnailPaths: domain.thumbnails.map((thumbnail) => thumbnail.unpack()),
    });

    return dto;
  }
}
