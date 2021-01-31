import JamRepositoryInterface from './jamRepositoryInterface';
import JamEntity from '../../entities/jamEntity';
import InvalidJamId from '../../errors/invalidJamId';
// import InvalidSongRole from '../../errors/invalidSongRole';

export default class JamInMemoryRepository implements JamRepositoryInterface {
  private jamTable: JamEntity[] = [];

  public async addJam(jamEntityObj: JamEntity): Promise<JamEntity> {
    this.jamTable.push(jamEntityObj);
    return jamEntityObj;
  }

  public async getJams(): Promise<JamEntity[]> {
    return this.jamTable;
  }

  public async getJamById(jamId: string, userProfileId?: string): Promise<JamEntity> {
    const jamObj = this.jamTable.find(jamEntityObj => {
      if (userProfileId)
        return jamEntityObj._id === jamId && jamEntityObj.jamCreatorUserId === userProfileId;

      return jamEntityObj._id === jamId;
    });

    if (!jamObj) {
      throw new InvalidJamId('jamId', 'cannot find the Jam by given JamId');
    }
    return jamObj;
  }

  public async updateJam(jamEntityObj: JamEntity): Promise<boolean> {
    const jamEntity = await this.getJamById(jamEntityObj._id);
    jamEntity.isPublic = jamEntityObj.isPublic;
    jamEntity.jamCreatorUserId = jamEntityObj.jamCreatorUserId;
    jamEntity.jamSong = jamEntityObj.jamSong;
    jamEntity.status = jamEntityObj.status;
    return true;
  }
}
