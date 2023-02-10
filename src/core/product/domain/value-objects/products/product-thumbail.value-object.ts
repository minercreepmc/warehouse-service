import { ArgumentInvalidExeception } from 'ts-common-exceptions';
import {
  AbstractValueObject,
  urlRegex,
  filePathRegex,
} from 'common-base-classes';

export class ProductThumbnailPathValueObject extends AbstractValueObject<string> {
  static create(path: string) {
    if (!this.isValid(path)) {
      throw new ArgumentInvalidExeception('Product thumbnail path invalid');
    }
    return new ProductThumbnailPathValueObject(path);
  }

  static createMany(paths: string[]): ProductThumbnailPathValueObject[] {
    return paths.map((path) => this.create(path));
  }

  static isValid(candidate: string) {
    return urlRegex.test(candidate) || filePathRegex.test(candidate);
  }

  constructor(value: string) {
    super({ value });
  }
}
