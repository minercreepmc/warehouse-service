import { ApiProperty } from '@nestjs/swagger';
import { AddProductsThumbnailsCommand } from '../orchestrators/data';

export class AddProductThumbnailsRequest
  implements AddProductsThumbnailsCommand
{
  @ApiProperty({
    example: ['example.com/img.png', 'example.com/img2.png'],
  })
  thumbnailPaths: string[];

  @ApiProperty({
    example: 'Apple',
  })
  productName: string;
}
