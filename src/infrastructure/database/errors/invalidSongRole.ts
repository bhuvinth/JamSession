import DatabaseError from './databaseErrors';

export default class InvalidSongRole extends DatabaseError {
  public static defaultErrorCode = 'INVALID_SONG_ROLE';

  constructor(field: string, reason: string) {
    super({ message: reason, details: { field, reason } });
  }
}
