import { Result } from 'oxide.ts';
import { CreateAdminResponseDto } from './create-admin.response.dto';


export type CreateAdminResult = Result<
  CreateAdminResponseDto,
  CreateAdminUseCaseError
>;
