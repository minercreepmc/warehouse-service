import { ArgumentInvalidExeception } from 'ts-common-exceptions';
import {
  AbstractValueObject,
  isStringBetweenLength,
} from 'common-base-classes';

/**
 * Represents a username for an admin account.
 * @extends AbstractValueObject<string>
 */
export class AdminUsernameValueObject extends AbstractValueObject<string> {
  /** The minimum length of the username. */
  private static readonly MIN_LENGTH = 3;
  /** The maximum length of the username. */
  private static readonly MAX_LENGTH = 20;
  /** The regular expression that forbid the special characters*/
  private static readonly FORBIDDEN_CHARACTER = /[^a-zA-Z0-9_]/;

  private get value() {
    return this.details.value;
  }

  /**
   * Determines if the given string is a valid username.
   * @param candidate - The string to check.
   * @returns true if the string is between MIN_LENGTH and MAX_LENGTH, false otherwise.
   */
  static isValid(candidate: string) {
    if (!isStringBetweenLength(candidate, this.MIN_LENGTH, this.MAX_LENGTH)) {
      return false;
    }

    if (candidate.match(this.FORBIDDEN_CHARACTER)) {
      return false;
    }

    return true;
  }

  /**
   * Creates a new `AdminUsernameValueObject`.
   * @param username - The string to be used as the username.
   * @throws ArgumentInvalidException if the username is not valid.
   */
  constructor(username: string) {
    if (!AdminUsernameValueObject.isValid(username)) {
      throw new ArgumentInvalidExeception('Username not valid');
    }
    super({ value: username });
  }

  /**
   * Format the username value object returning a string, it not mutate the current object
   * @returns string for making a new AdminUsernameValueObject
   */
  format(): string {
    return this.value.trim().toLowerCase();
  }
}
