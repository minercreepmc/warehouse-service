import { ProductAggregate } from '@aggregates/product';
import { Injectable } from '@nestjs/common';
import { ProductNameValueObject } from '@value-objects/product';
import { OrchestrateMapper } from 'common-base-classes';
import {
  GetQualityOnHandDomainData,
  GetQualityOnHandQuery,
  GetQualityOnHandResponseDto,
} from './data';

@Injectable()
export class GetQualityOnHandMapper
  implements
    OrchestrateMapper<
      GetQualityOnHandDomainData,
      GetQualityOnHandQuery,
      GetQualityOnHandResponseDto
    >
{
  toDomain(query: GetQualityOnHandQuery): GetQualityOnHandDomainData {
    const name = ProductNameValueObject.create(query.name);

    return {
      name,
    };
  }

  toResponseDTO(product: ProductAggregate): GetQualityOnHandResponseDto {
    const dto = new GetQualityOnHandResponseDto({
      name: product.name.unpack(),
      quantity: product.quantity.unpack(),
      //unit: product.unit.unpack(),
    });

    return dto;
  }
}
