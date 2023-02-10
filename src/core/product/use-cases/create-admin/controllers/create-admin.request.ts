import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminRequest {
  @ApiProperty({
    description: 'Username of the admin',
    type: String,
    example: 'admin123',
  })
  username: string;

  @ApiProperty({
    description: 'Password of the admin',
    type: String,
    example: 'password123',
  })
  password: string;
}
