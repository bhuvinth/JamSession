import JamRole from './jamRole';
import InvalidJamRole from '../domainErrors/invalidJamRole';

describe('Test JamRole Value object', () => {
  test('should fail to create JamRole if empty values is used to create a Jam role.', () => {
    expect(() => JamRole.create('')).toThrow(InvalidJamRole);
  });

  test('should fail to create JamRole if empty space values is used to create a Jam role.', () => {
    expect(() => JamRole.create('   ')).toThrow(InvalidJamRole);
  });

  test('should create JamRole if non empty space values is used to create a Jam role.', () => {
    const jamRoleValue = 'Guitarist';
    expect(JamRole.create(jamRoleValue).value).toStrictEqual([jamRoleValue]);
  });
});
