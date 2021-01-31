import UserName from './userName';
import InvalidUsername from '../domainErrors/invalidUserName';

describe('Test UserName Value object', () => {
  test('should fail to create UserName if empty values is used to create a Username.', () => {
    expect(() => UserName.create('')).toThrow(InvalidUsername);
  });

  test('should fail to create UserName if invalid values is used to create a Username.', () => {
    expect(() => UserName.create('abc')).toThrow(InvalidUsername);
  });

  test('should create UserName if valid emailis used to create a Username.', () => {
    const userNameValue = ' User@google.com '; // Valid email
    expect(UserName.create(userNameValue).value).toStrictEqual(userNameValue.trim());
  });
});
