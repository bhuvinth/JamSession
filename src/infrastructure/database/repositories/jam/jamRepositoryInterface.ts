import JamEntity from '../../entities/jamEntity';

export default interface JamRepositoryInterface {
  addJam(jamEntityObj: JamEntity): Promise<JamEntity>;
  updateJam(jamEntity: JamEntity): Promise<boolean>;
  getJams(): Promise<JamEntity[]>;
  getJamById(jamId: string, userProfileId?: string): Promise<JamEntity>;
}
