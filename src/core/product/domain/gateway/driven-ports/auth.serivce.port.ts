import {
  AdminPasswordValueObject,
  AdminUsernameValueObject,
} from '@admin-value-object';

export interface AuthResult {
  /**
   * Whether or not the authentication was successful
   */
  isAuthenticated: boolean;

  /**
   * An optional error that provides information about why authentication failed
   */
  error?: string;
}

export interface AuthServicePort {
  authenticate(
    username: AdminUsernameValueObject,
    password: AdminPasswordValueObject,
  ): Promise<AuthResult>;
}

export const authServiceDiToken = Symbol('AUTH_SERVICE');
