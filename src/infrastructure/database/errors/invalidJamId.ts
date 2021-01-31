import DatabaseError from './databaseErrors';

export default class InvalidJamId extends DatabaseError {
  public static defaultErrorCode = 'INVALID_JAM_ID';

  constructor(field: string, reason: string) {
    super({ message: reason, details: { field, reason } });
  }
}
