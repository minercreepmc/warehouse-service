import { MultipleExceptions } from '@common-exceptions';
import { AbstractValueObject } from 'common-base-classes';
import {
  IsAllowdToContainsWhitespaceOptions,
  IsAllowedToBeEmptyOptions,
  IsAllowedToContainsLowercaseOptions,
  IsAllowedToContainsNumbersOptions,
  IsAllowedToContainsSymbolsOptions,
  IsAllowedToContainsUppercaseOptions,
  IsAllowLengthOptions,
  IsHigherEqualThanMinLengthOptions,
  IsLowerEqualThanMaxLengthOptions,
  TextValueObjectOptions,
} from './text.interface';
import {
  ArgumentContainsEmptyStringException,
  ArgumentContainsLowercaseException,
  ArgumentContainsNumberException,
  ArgumentContainsSymbolException,
  ArgumentContainsUppercaseException,
  ArgumentContainsWhitespaceException,
  ArgumentTooLongException,
  ArgumentTooShortException,
} from '@common-exceptions';
import { ValidationResponse } from '@common-interfaces';
import { TextOptionsIsNotValidException } from './text.exception';

export class TextValueObject extends AbstractValueObject<string> {
  constructor(
    value: string,
    private readonly options: TextValueObjectOptions = TextValueObject.DEFAULT_OPTIONS,
  ) {
    const opt = Object.assign({}, TextValueObject.DEFAULT_OPTIONS, options);

    const { isValid, exceptions: errors } = TextValueObject.validate(
      value,
      opt,
    );

    if (!isValid) {
      throw new MultipleExceptions(errors);
    }

    super({ value });
  }

  getOptions(): TextValueObjectOptions {
    return this.options;
  }

  static isValidOptions(candidate: unknown) {
    if (typeof candidate !== 'object' || candidate === null) {
      return false;
    }

    if (Object.keys(candidate).length === 0) {
      return false;
    }

    const options = candidate as TextValueObjectOptions;
    const {
      maxLength,
      minLength,
      allowEmpty,
      allowNumber,
      allowSymbols,
      allowLowercase,
      allowUppercase,
      allowWhitespace,
    } = options;

    if (
      (maxLength && typeof maxLength !== 'number') ||
      (minLength && typeof minLength !== 'number') ||
      (allowEmpty && typeof allowEmpty !== 'boolean') ||
      (allowNumber && typeof allowNumber !== 'boolean') ||
      (allowSymbols && typeof allowSymbols !== 'boolean') ||
      (allowLowercase && typeof allowLowercase !== 'boolean') ||
      (allowUppercase && typeof allowUppercase !== 'boolean') ||
      (allowWhitespace && typeof allowWhitespace !== 'boolean')
    ) {
      return false;
    }

    return true;
  }

  static validate(
    value: string,
    options: TextValueObjectOptions,
  ): ValidationResponse {
    const errors = [];
    const opts = Object.assign({}, TextValueObject.DEFAULT_OPTIONS, options);

    if (!TextValueObject.isValidOptions(opts)) {
      throw new TextOptionsIsNotValidException();
    }

    const {
      maxLength,
      minLength,
      allowEmpty,
      allowNumber,
      allowSymbols,
      allowLowercase,
      allowUppercase,
      allowWhitespace,
    } = opts;

    if (
      TextValueObject.isEmpty(value) &&
      !TextValueObject.isAllowedToBeEmpty(value, { allowEmpty })
    ) {
      errors.push(new ArgumentContainsEmptyStringException());
    }

    if (
      TextValueObject.isContainsNumber(value) &&
      !TextValueObject.isAllowToContainsNumbers(value, { allowNumber })
    ) {
      errors.push(new ArgumentContainsNumberException());
    }

    if (
      TextValueObject.isContainsSymbol(value) &&
      !TextValueObject.isAllowedToContainsSymbols(value, { allowSymbols })
    ) {
      errors.push(new ArgumentContainsSymbolException());
    }

    if (
      TextValueObject.isContainsWhitespace(value) &&
      !TextValueObject.isAllowToContainsWhitespace(value, { allowWhitespace })
    ) {
      errors.push(new ArgumentContainsWhitespaceException());
    }

    if (
      TextValueObject.isContainsUppercase(value) &&
      !TextValueObject.isAllowToContainsUppercase(value, { allowUppercase })
    ) {
      errors.push(new ArgumentContainsUppercaseException());
    }

    if (
      TextValueObject.isContainsLowercase(value) &&
      !TextValueObject.isAllowToContainsLowercase(value, { allowLowercase })
    ) {
      errors.push(new ArgumentContainsLowercaseException());
    }

    if (!TextValueObject.isHigherEqualThanMinLength(value, { minLength })) {
      errors.push(new ArgumentTooShortException());
    }

    if (!TextValueObject.isLowerEqualThanMaxLength(value, { maxLength })) {
      errors.push(new ArgumentTooLongException());
    }

    if (errors.length === 0) {
      return {
        isValid: true,
        exceptions: [],
      };
    } else {
      return {
        isValid: false,
        exceptions: errors,
      };
    }
  }

  static readonly DEFAULT_OPTIONS: TextValueObjectOptions = {
    minLength: 0,
    maxLength: Number.MAX_SAFE_INTEGER,
    allowSymbols: false,
    allowWhitespace: true,
    allowUppercase: true,
    allowLowercase: true,
    allowNumber: true,
    allowEmpty: false,
  };

  static isAllowLength(value: string, options?: IsAllowLengthOptions): boolean {
    if (!TextValueObject.isValidOptions(options)) {
      throw new TextOptionsIsNotValidException();
    }
    return (
      this.isLowerEqualThanMaxLength(value, options) &&
      this.isHigherEqualThanMinLength(value, options)
    );
  }

  static isHigherEqualThanMinLength(
    value: string,
    options: IsHigherEqualThanMinLengthOptions,
  ): boolean {
    if (!TextValueObject.isValidOptions(options)) {
      throw new TextOptionsIsNotValidException();
    }

    const { minLength = this.DEFAULT_OPTIONS.minLength } = options;
    return value.length >= minLength;
  }

  static isLowerEqualThanMaxLength(
    value: string,
    options: IsLowerEqualThanMaxLengthOptions,
  ) {
    if (!TextValueObject.isValidOptions(options)) {
      throw new TextOptionsIsNotValidException();
    }
    const { maxLength = this.DEFAULT_OPTIONS.maxLength } = options;
    return value.length <= maxLength;
  }

  static isEmpty(value: string): boolean {
    return value.trim().length === 0;
  }

  static isAllowedToBeEmpty(value: string, options: IsAllowedToBeEmptyOptions) {
    if (!TextValueObject.isValidOptions) {
      throw new TextOptionsIsNotValidException();
    }

    const { allowEmpty = this.DEFAULT_OPTIONS.allowEmpty } = options;
    return allowEmpty || !this.isEmpty(value);
  }

  static isContainsSymbol(value: string) {
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
  }

  static isAllowedToContainsSymbols(
    value: string,
    options?: IsAllowedToContainsSymbolsOptions,
  ) {
    const { allowSymbols = TextValueObject.isAllowedToContainsSymbols } =
      options;
    return allowSymbols || !this.isContainsSymbol(value);
  }

  static isContainsWhitespace(value: string) {
    return /\s/.test(value);
  }

  static isAllowToContainsWhitespace(
    value: string,
    options: IsAllowdToContainsWhitespaceOptions,
  ) {
    if (!TextValueObject.isValidOptions) {
      throw new TextOptionsIsNotValidException();
    }
    const {
      allowWhitespace = TextValueObject.DEFAULT_OPTIONS.allowWhitespace,
    } = options;
    return allowWhitespace || !this.isContainsWhitespace(value);
  }

  static isContainsUppercase(value: string) {
    return /[A-Z]/u.test(value);
  }

  static isAllowToContainsUppercase(
    value: string,
    options?: IsAllowedToContainsUppercaseOptions,
  ) {
    if (!TextValueObject.isValidOptions) {
      throw new TextOptionsIsNotValidException();
    }
    const { allowUppercase = TextValueObject.DEFAULT_OPTIONS.allowUppercase } =
      options;
    return allowUppercase || !this.isContainsUppercase(value);
  }

  static isContainsLowercase(value: string) {
    return /[a-z]/u.test(value);
  }

  static isAllowToContainsLowercase(
    value: string,
    options?: IsAllowedToContainsLowercaseOptions,
  ) {
    if (!TextValueObject.isValidOptions) {
      throw new TextOptionsIsNotValidException();
    }
    const { allowLowercase = TextValueObject.DEFAULT_OPTIONS.allowLowercase } =
      options;
    return allowLowercase || !this.isContainsLowercase(value);
  }

  static isContainsNumber(value: string) {
    return /\d/.test(value);
  }

  static isAllowToContainsNumbers(
    value: string,
    options: IsAllowedToContainsNumbersOptions,
  ) {
    if (!TextValueObject.isValidOptions) {
      throw new TextOptionsIsNotValidException();
    }
    const { allowNumber = TextValueObject.DEFAULT_OPTIONS.allowNumber } =
      options;
    return allowNumber || !this.isContainsNumber(value);
  }
}
