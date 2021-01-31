import DatabaseError from './databaseErrors';

export default class UnableToSave extends DatabaseError {
  public static defaultErrorCode = 'UNABLE_TO_SAVE';

  constructor(field: string, reason: string) {
    super({ message: reason, details: { field, reason } });
  }
}
