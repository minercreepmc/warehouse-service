import { ProductDomainService } from '@domain-services/product';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'oxide.ts';
import {
  GetQualityOnHandBusinessChecker,
  GetQualityOnHandMapper,
  GetQualityOnHandValidator,
} from './orchestrators';
import {
  GetQualityOnHandQuery,
  GetQualityOnHandResult,
} from './orchestrators/data';

@QueryHandler(GetQualityOnHandQuery)
export class GetQualityOnHandHandler
  implements IQueryHandler<GetQualityOnHandQuery, GetQualityOnHandResult>
{
  constructor(
    private readonly mapper: GetQualityOnHandMapper,
    private readonly validator: GetQualityOnHandValidator,
    private readonly businessChecker: GetQualityOnHandBusinessChecker,
    private readonly domainService: ProductDomainService,
  ) {}

  async execute(query: GetQualityOnHandQuery): Promise<GetQualityOnHandResult> {
    this.validator.clearNoteAndCheck(query);
    if (!this.validator.isValid()) {
      return Err(this.validator.errors);
    }
    const domainData = this.mapper.toDomain(query);

    await this.businessChecker.clearNoteAndCheck(domainData);
    if (!this.businessChecker.isValid()) {
      return Err(this.businessChecker.errors);
    }

    const product = await this.domainService.getProduct(domainData.name);

    return Ok(this.mapper.toResponseDTO(product));
  }
}
