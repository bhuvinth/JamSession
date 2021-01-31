import { ulid } from 'ulid';

export default class UlidGenerator {
  public static generateId() {
    return ulid();
  }
}
