import { ApiProperty } from '@nestjs/swagger';
import { AddProductThumbnailsResponseDto } from '../orchestrators/data';

export class AddProductThumbnailsResponse
  implements AddProductThumbnailsResponseDto
{
  @ApiProperty({
    example: ['example.com/img.png', 'example.com/img2.png'],
  })
  thumbnailPaths: string[];

  @ApiProperty({
    example: 'Banana',
  })
  productName: string;
}
