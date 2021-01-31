import DatabaseError from './databaseErrors';

export default class UserNameAlreadyExists extends DatabaseError {
  public static defaultErrorCode = 'USERNAME_ALREADY_EXISTS';

  constructor(field: string, reason: string) {
    super({ message: reason, details: { field, reason } });
  }
}
