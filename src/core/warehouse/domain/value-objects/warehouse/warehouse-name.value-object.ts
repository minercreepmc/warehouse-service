import { ArgumentInvalidException } from 'ts-common-exceptions';
import {
  AbstractValueObject,
  isStringBetweenLength,
} from 'common-base-classes';

/**
 * Represents a warehouse name as a value object.
 * @extends {AbstractValueObject}
 */
export class WarehouseNameValueObject extends AbstractValueObject<string> {
  private static readonly MAX_LENGTH = 100;
  private static readonly VALID_CHARACTERS_REGEX = /^[a-zA-Z0-9 ]+$/;

  /**
   * Checks if the given name is valid.
   *
   * @param name The name to validate.
   * @returns `true` if the name is valid, `false` otherwise.
   */
  static isValidFormat(name: unknown): boolean {
    if (!this.isValidLength(name)) {
      return false;
    }

    if (!this.isValidName(name)) {
      return false;
    }

    return true;
  }
  /**
   * Checks if the length of the given name is valid.
   *
   * @param name The name to validate.
   * @returns `true` if the length is valid, `false` otherwise.
   */
  private static isValidLength(name: unknown) {
    return (
      typeof name === 'string' &&
      isStringBetweenLength(name, 0, this.MAX_LENGTH)
    );
  }

  /**
   * Checks if the given name contains only valid characters.
   *
   * @param name The name to validate.
   * @returns `true` if the name is valid, `false` otherwise.
   */
  private static isValidName(name: unknown) {
    return typeof name === 'string' && this.VALID_CHARACTERS_REGEX.test(name);
  }
  /**
   * Creates a new `WarehouseNameValueObject` instance.
   *
   * @param name The name of the warehouse.
   * @throws {ArgumentInvalidException} If the given name is invalid.
   */
  constructor(name: string) {
    if (!WarehouseNameValueObject.isValidFormat(name)) {
      throw new ArgumentInvalidException('Invalid warehouse name');
    }
    super({ value: name });
  }
}
