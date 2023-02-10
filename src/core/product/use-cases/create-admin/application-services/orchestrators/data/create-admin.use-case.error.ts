import {
  AdminBusinessError,
  AdminValidationError,
} from '@product-domain-errors';

export type CreateAdminUseCaseError =
  | AdminValidationError[]
  | AdminBusinessError[];
