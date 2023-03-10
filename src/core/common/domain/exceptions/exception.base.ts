export class MultipleExceptions extends Error {
  constructor(exceptions: Error[]) {
    const message = exceptions
      .map((error, index) => `${index + 1}. ${error.constructor.name}`)
      .join('\n');
    super(message);
    this.name = 'MultipleArgumentException';
    this.exceptions = exceptions;
  }

  exceptions: Error[];
}

export class ValidationException extends Error {}

export class InvalidOperationException extends Error {}
