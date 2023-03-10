import { ValidationException } from '@common-exceptions';

export interface ValidationResponse {
  isValid: boolean;
  errors: ValidationException[];
}
