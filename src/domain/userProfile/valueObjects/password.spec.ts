import Password from './password';
import InvalidPassword from '../domainErrors/invalidPassword';

describe('Test Password Value object', () => {
  test('should fail to create Password if empty values is used to create a Password.', () => {
    expect(() => Password.create('')).toThrow(InvalidPassword);
  });

  test('should fail to create Password if invalid values is used to create a Password.', () => {
    expect(() => Password.create('abc')).toThrow(InvalidPassword);
  });

  test('should create Password if valid password i.e. Atleast One Upper case, One Lower Case, One special character of $%^&* and 8 characters is used to create a Password.', () => {
    const passwordValue = ' User@123 ';
    expect(Password.create(passwordValue).value).toStrictEqual(passwordValue.trim());
  });
});
