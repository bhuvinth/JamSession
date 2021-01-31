import DomainError from '@main/domain/common/errors/domainError';

export default class UnableToStartJam extends DomainError {
  public static defaultErrorCode = 'UNABLE_TO_START_JAM';

  constructor(field: string, reason: string) {
    super({ message: reason, details: { field, reason } });
  }
}
