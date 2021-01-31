import { IsDefined, IsArray } from 'class-validator';

export class SongRoleDto {
  @IsDefined()
  public role: string;

  @IsDefined()
  public isRequired: boolean;

  public assignedUserId?: string;
}

export class SongDto {
  public id: string;

  @IsDefined()
  public notes: string;

  @IsDefined()
  public name: string;

  @IsDefined()
  @IsArray()
  public songRoles: SongRoleDto[];
}
