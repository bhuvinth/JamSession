import { IsDefined } from 'class-validator';
import { SongDto } from './songDto';

export default class JamDto {
  public jamId: string;

  @IsDefined()
  public jamSong: SongDto;

  @IsDefined()
  public jamCreatorUserId: string;
}
