import ApplicationError from '@common/errors/applicationError';

export default class DomainError extends ApplicationError {
  public static defaultErrorCode = 'DOMAIN_ERROR';
}
