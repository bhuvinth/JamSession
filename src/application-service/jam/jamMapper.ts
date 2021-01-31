import Jam from '@main/domain/jam/jam';
import JamEntity from '@main/infrastructure/database/entities/jamEntity';
import SongEntity, { SongRoleEntity } from '@main/infrastructure/database/entities/songEntity';
import JamDto from '@main/infrastructure/dto/jamDto';
import { SongDto, SongRoleDto } from '@main/infrastructure/dto/songDto';

export default class JamMapper {
  public static fromDomainToEntity(jamDomainObj: Jam): JamEntity {
    const songEntityObj = new SongEntity();
    songEntityObj.id = jamDomainObj.jamSong.id.value;
    songEntityObj.name = jamDomainObj.jamSong.name;
    songEntityObj.notes = jamDomainObj.jamSong.notes;
    songEntityObj.roles = jamDomainObj.jamSong.roles.map(role => {
      const songRoleEntityObj = new SongRoleEntity();
      songRoleEntityObj.assignedUserId = role.assignedUserId || null;
      songRoleEntityObj.isRequired = role.isRequired;
      songRoleEntityObj.role = role.role;
      return songRoleEntityObj;
    });

    const jamEntityObj = new JamEntity();
    jamEntityObj._id = jamDomainObj.jamId.value;
    jamEntityObj.jamCreatorUserId = jamDomainObj.jamCreatorUserId;
    jamEntityObj.jamSong = songEntityObj;
    return jamEntityObj;
  }

  public static fromDomainToDto(jamDomainObj: Jam): JamDto {
    const jamDtoObj = new JamDto();

    jamDtoObj.jamCreatorUserId = jamDomainObj.jamCreatorUserId;
    jamDtoObj.jamId = jamDomainObj.jamId.value;

    const jamSongDtoObj = new SongDto();
    jamSongDtoObj.id = jamDomainObj.jamSong.id.value;
    jamSongDtoObj.name = jamDomainObj.jamSong.name;
    jamSongDtoObj.notes = jamDomainObj.jamSong.notes;
    jamSongDtoObj.songRoles = jamDomainObj.jamSong.roles.map(roleObj => {
      const songRoleDtoObj = new SongRoleDto();
      songRoleDtoObj.assignedUserId = roleObj.assignedUserId;
      songRoleDtoObj.isRequired = roleObj.isRequired;
      songRoleDtoObj.role = roleObj.role;
      return songRoleDtoObj;
    });
    jamDtoObj.jamSong = jamSongDtoObj;
    return jamDtoObj;
  }
}
