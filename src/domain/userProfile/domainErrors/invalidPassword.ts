import DomainError from '@main/domain/common/errors/domainError';

export default class InvalidUsername extends DomainError {
  public static defaultErrorCode = 'INVALID_PASSWORD';

  constructor(field: string, reason: string) {
    super({ message: reason, details: { field, reason } });
  }
}
