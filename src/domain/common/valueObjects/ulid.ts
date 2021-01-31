import UlidGenerator from '@main/utils/ulidGenerator';

export default class Ulid {
  public get value() {
    return this.id;
  }

  // eslint-disable-next-line no-useless-constructor
  private constructor(
    private id: string, // eslint-disable-next-line no-empty-function
  ) {}

  public static create() {
    return new Ulid(UlidGenerator.generateId());
  }

  public static fromPersistence(ulidInput: string) {
    return new Ulid(ulidInput);
  }
}
