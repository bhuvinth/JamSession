/* eslint-disable @typescript-eslint/naming-convention */
import { Db } from 'mongodb';
import JamRepositoryInterface from './jamRepositoryInterface';
import JamEntity from '../../entities/jamEntity';
import UnableToSave from '../../errors/unableToSave';
import InvalidJamId from '../../errors/invalidJamId';

export default class JamMongoRepository implements JamRepositoryInterface {
  private db: Db;

  private jamCollection = 'jam';

  public constructor(databaseConnection: Db) {
    this.db = databaseConnection;
  }

  public async addJam(jamEntityObj: JamEntity): Promise<JamEntity> {
    const saveMongoResponse = await this.db.collection(this.jamCollection).insertOne(jamEntityObj);
    if (!saveMongoResponse.insertedCount) throw new UnableToSave('', 'Cannot save JamSession');
    return jamEntityObj;
  }

  public async getJams(): Promise<JamEntity[]> {
    const getJamResponse = await this.db.collection(this.jamCollection).find();
    return getJamResponse.toArray();
  }

  public async getJamById(jamId: string, userProfileId?: string): Promise<JamEntity> {
    const jamFilter = { _id: jamId };


    if (userProfileId) {
      Object.assign(jamFilter, { jamCreatorUserId: userProfileId });
    }
    const jamEntityObj = await this.db
      .collection(this.jamCollection)
      .find<JamEntity>(jamFilter)
      .toArray();

    if (!jamEntityObj.length) {
      throw new InvalidJamId('jamId', 'cannot find the Jam by given JamId');
    }
    return jamEntityObj[0];
  }

  public async updateJam(jamEntityObj: JamEntity): Promise<boolean> {
    const jamEntityUpdateResult = await this.db
      .collection(this.jamCollection)
      .update({ _id: jamEntityObj._id }, jamEntityObj, { upsert: false });

    if (!jamEntityUpdateResult.result.nModified)
      throw new UnableToSave('', 'Unable to Save the update for JamSession');

    return true;
  }
}
