import DomainError from '@main/domain/common/errors/domainError';

export default class InvalidSongRole extends DomainError {
  public static defaultErrorCode = 'INVALID_SONG_ROLE';

  constructor(field: string, reason: string) {
    super({ message: reason, details: { field, reason } });
  }
}
