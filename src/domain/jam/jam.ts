import JamEntity from '@main/infrastructure/database/entities/jamEntity';
import JamStatus from '@main/common/jamStatus';
import JamDto from '@main/infrastructure/dto/jamDto';
import Ulid from '../common/valueObjects/ulid';
import Song from './song';
import UnableToStartJam from './errors/unableToStartJam';

export default class Jam {
  public jamId: Ulid;

  public jamSong: Song;

  public jamCreatorUserId: string;

  public status: JamStatus;

  private constructor(id: Ulid, jamSong: Song, jamCreatorUserId: string, status: JamStatus) {
    this.jamId = id;
    this.jamSong = jamSong;
    this.jamCreatorUserId = jamCreatorUserId;
    this.status = status;
  }

  public static createJam(jamDto: JamDto, jamSong: Song) {
    const newJam = new Jam(Ulid.create(), jamSong, jamDto.jamCreatorUserId, JamStatus.created);
    return newJam;
  }

  public static fromEntity(jamEntityObj: JamEntity) {
    const ulid = Ulid.fromPersistence(jamEntityObj._id);
    const song = Song.fromEntity(jamEntityObj.jamSong);
    const jam = new Jam(ulid, song, jamEntityObj.jamCreatorUserId, jamEntityObj.status);
    return jam;
  }

  public startJam() {
    const unAssignedSongRole = this.jamSong.roles.find(
      songRoles => songRoles.isRequired && !songRoles.assignedUserId,
    );
    if (unAssignedSongRole) {
      throw new UnableToStartJam('', 'All the roles are not yet fulfilled');
    }
    this.status = JamStatus.started;
  }
}
