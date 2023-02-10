import {
  AbstractValueObject,
  isStringBetweenLength,
} from 'common-base-classes';
import { ArgumentInvalidExeception } from 'ts-common-exceptions';

/**
 * Represents the password for an admin user.
 * The password must be between 8 and 16 characters long, and must contain at least one alphabet character, one number, and one special character.
 * @extends AbstractValueObject
 */
export class AdminPasswordValueObject extends AbstractValueObject<string> {
  /** The minimum length of the password */
  private static readonly MIN_LENGTH = 8;
  /** The maximum length of the password */
  private static readonly MAX_LENGTH = 16;
  /** The regular expression that the password must match */
  private static readonly REQUIREMENT =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/;

  /**
   * Validates a candidate password.
   * @param candidate - The password to validate
   * @returns `true` if the password is valid, `false` otherwise
   */
  static isValid(candidate: string) {
    if (!isStringBetweenLength(candidate, this.MIN_LENGTH, this.MAX_LENGTH)) {
      return false;
    }

    if (!candidate.match(this.REQUIREMENT)) {
      return false;
    }

    return true;
  }

  /**
   * Creates a new `AdminPasswordValueObject`.
   * @param password - The password */
  constructor(password: string) {
    if (AdminPasswordValueObject.isValid(password)) {
      throw new ArgumentInvalidExeception('Invalid password');
    }
    super({
      value: password,
    });
  }
}
