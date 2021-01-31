import DomainError from '@main/domain/common/errors/domainError';

export default class InvalidUserName extends DomainError {
  public static defaultErrorCode = 'INVALID_USERNAME';

  constructor(field: string, reason: string) {
    super({ message: reason, details: { field, reason } });
  }
}
