import JamStatus from '@main/common/jamStatus';
import SongEntity from './songEntity';

export default class JamEntity {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public _id: string;

  public jamCreatorUserId: string;

  public isPublic: boolean = true;

  public status: JamStatus = JamStatus.created;

  public jamSong: SongEntity;
}
