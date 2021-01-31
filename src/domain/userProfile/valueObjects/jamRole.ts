import InvalidJamRole from '../domainErrors/invalidJamRole';

export default class JamRole {
  public get value() {
    return this.jamRoleValue;
  }

  private jamRoleValue: string[] = [];

  // eslint-disable-next-line no-useless-constructor
  private constructor(
    jamRole: string[], // eslint-disable-next-line no-empty-function
  ) {
    this.jamRoleValue = jamRole;
  }

  public static create(jamRole: string) {
    if (!jamRole.trim()) {
      throw new InvalidJamRole('jamRole', 'Jam Role must be defined');
    }
    return new JamRole([jamRole]);
  }

  public static fromPersistence(jamRoles: string[]) {
    return new JamRole(jamRoles);
  }
}
