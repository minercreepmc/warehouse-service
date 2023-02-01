import { CreateProductResponseDto } from '../orchestrators/data';

export abstract class CreateProductResponse
  implements CreateProductResponseDto
{
  name: string;
}
