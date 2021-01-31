import ApplicationError from '@common/errors/applicationError';

export default class DatabaseError extends ApplicationError {
  public static defaultErrorCode = 'DATABASE_ERROR';
}
