import { SongDto, SongRoleDto } from '@main/infrastructure/dto/songDto';
import SongEntity, { SongRoleEntity } from '@main/infrastructure/database/entities/songEntity';
import Ulid from '../common/valueObjects/ulid';
import InvalidSongRole from './errors/invalidSongRole';

export class SongRole {
  public role: string;

  public isRequired: boolean;

  public assignedUserId?: string;

  private constructor(role: string, isRequired: boolean, assignedUserId?: string) {
    this.role = role;
    this.isRequired = isRequired;
    if (assignedUserId) this.assignedUserId = assignedUserId;
  }

  public static create(songRoleArray: SongRoleDto[]): SongRole[] {
    const roleArray = songRoleArray.map((songRoleInput: any) => {
      const songRole = new SongRole(songRoleInput.role, songRoleInput.isRequired);
      return songRole;
    });
    return roleArray;
  }

  public static fromEntity(songRoleEntityObjArray: SongRoleEntity[]) {
    const songRoleArray = songRoleEntityObjArray.map(songRoleEntityObj => {
      const songRole = new SongRole(
        songRoleEntityObj.role,
        songRoleEntityObj.isRequired,
        songRoleEntityObj.assignedUserId || undefined,
      );
      return songRole;
    });
    return songRoleArray;
  }
}

export default class Song {
  public id: Ulid;

  public name: string;

  public roles: SongRole[];

  public notes: string;

  private constructor(id: Ulid, name: string, roles: SongRole[], notes: string) {
    this.id = id;
    this.name = name;
    this.notes = notes;
    this.roles = roles;
  }

  public static create(jamSong: SongDto): Song {
    const songRoles = SongRole.create(jamSong.songRoles);
    const newSongId = Ulid.create();
    const newJamSong = new Song(newSongId, jamSong.name, songRoles, jamSong.notes);
    return newJamSong;
  }

  public static fromEntity(jamSongEntityObj: SongEntity) {
    const songRoles = SongRole.fromEntity(jamSongEntityObj.roles);
    const ulid = Ulid.fromPersistence(jamSongEntityObj.id);
    return new Song(ulid, jamSongEntityObj.name, songRoles, jamSongEntityObj.notes);
  }

  public assignUserToSongRole(userProfileId: string, role: string) {
    const foundRole = this.roles.find(songRole => songRole.role === role);
    if (!foundRole) {
      throw new InvalidSongRole('role', 'No role name found matching with the given role');
    }
    foundRole.assignedUserId = userProfileId;
    return true;
  }
}
