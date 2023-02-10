import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminResponse {
  @ApiProperty({
    description: 'Password of the admin',
    type: String,
    example: 'password123',
  })
  username: string;
}
