import InvalidUsername from '../domainErrors/invalidPassword';

export default class Password {
  public get value() {
    return this.passwordValue;
  }

  private passwordValue: string;

  // eslint-disable-next-line no-useless-constructor
  private constructor(
    password: string, // eslint-disable-next-line no-empty-function
  ) {
    this.passwordValue = password;
  }

  public static create(password: string) {
    if (!password) {
      throw new InvalidUsername('password', 'password cannot be empty');
    }
    if (!this.validatePassword(password)) {
      throw new InvalidUsername(
        'password',
        'password should contain at least one upper case and one lower case, one special character of @#$%^&* and be at least 8 characters long',
      );
    }

    return new Password(password.trim());
  }

  private static validatePassword(password: string): boolean {
    const regexForPassword = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );
    return regexForPassword.test(password);
  }
}
