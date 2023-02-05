import { CreateProductResponseDto } from '../application-services/orchestrators/data';

export abstract class CreateProductResponse
  implements CreateProductResponseDto
{
  name: string;
}
