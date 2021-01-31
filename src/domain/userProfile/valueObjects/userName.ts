import InvalidUserName from '../domainErrors/invalidUserName';

export default class UserName {
  public get value() {
    return this.userNameValue;
  }

  private userNameValue: string;

  // eslint-disable-next-line no-useless-constructor
  private constructor(
    userName: string, // eslint-disable-next-line no-empty-function
  ) {
    this.userNameValue = userName;
  }

  public static create(userNameInput: string) {
    const userName = userNameInput.trim();
    if (!userName) {
      throw new InvalidUserName('userName', 'userName must be defined');
    }
    if (!this.validateEmail(userName)) {
      throw new InvalidUserName('userName', 'userName must be a valid email');
    }

    return new UserName(userName);
  }

  private static validateEmail(email: string): boolean {
    // eslint-disable-next-line no-useless-escape
    const regexForUserName = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexForUserName.test(email);
  }
}
