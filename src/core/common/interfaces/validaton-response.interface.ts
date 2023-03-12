import { ValidationException } from '@common-exceptions';

export interface ValidationResponse {
  isValid: boolean;
  exceptions: ValidationException[];
}
