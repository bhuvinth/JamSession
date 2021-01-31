import DomainError from '@main/domain/common/errors/domainError';

export default class InvalidJamRole extends DomainError {
  public static defaultErrorCode = 'INVALID_JAM_ROLE';

  constructor(field: string, reason: string) {
    super({ message: reason, details: { field, reason } });
  }
}
