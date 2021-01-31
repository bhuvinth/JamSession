export default class SongEntity {
  public id: string;

  public name: string;

  public roles: SongRoleEntity[];

  public notes: string;
}

export class SongRoleEntity {
  public role: string;

  public isRequired: boolean;

  public assignedUserId: string | null = null;
}
