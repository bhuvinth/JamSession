import { Db } from 'mongodb';
import UserProfileRepositoryInterface from './userProfileRepositoryInterface';
import UserProfileEntity, { ContactDetailEntity } from '../../entities/userProfileEntity';
import UserNameAlreadyExists from '../../errors/userNameAlreadyExists';
import UnableToSave from '../../errors/unableToSave';
import AppConfig from '@main/config/appConfig';
import SchemaVersionEntity from '../../entities/schemaVersionEntity';

export default class UserProfileMongoRepository implements UserProfileRepositoryInterface {
  private db: Db;
  private collectionName = 'userProfile';

  public constructor(databaseConnection: Db) {
    this.db = databaseConnection;
  }

  async getUserProfiles(): Promise<UserProfileEntity[]> {
      const getUserResponse = await this.db.collection(this.collectionName).find();
      const userDataArray = await getUserResponse.toArray();
      return this.mapUserDataFromDifferentSchemas(userDataArray);
  }

  public mapUserDataFromDifferentSchemas(usersDataArray:any[]): UserProfileEntity[] {
    const versionedUserData: UserProfileEntity[] = usersDataArray.map((userData)=>{
      const userProfileObj:UserProfileEntity = userData;

      if(userData.schemaVersion < AppConfig.currentUserSchemaVersion) {
        userProfileObj.contactDetails = new ContactDetailEntity();
        userProfileObj.contactDetails.phone = userData.contactNumber;
        userProfileObj.contactDetails.mobile = '';
        userProfileObj.contactDetails.email = '';
        return userProfileObj;
      }
      
      console.log(userData.contactDetails)
      userProfileObj.contactDetails = userData.contactDetails;

      return userProfileObj;
    })

    return versionedUserData;
  }

  async addUserProfile(userProfileEntityObj: UserProfileEntity): Promise<UserProfileEntity> {
    const foundUser = await this.db
      .collection(this.collectionName)
      .findOne({ userName: userProfileEntityObj.userName });
    if (foundUser) {
      throw new UserNameAlreadyExists(
        'userName',
        `${userProfileEntityObj.userName} already exists`,
      );
    }
    const userProfileWithSchemaVersion = this.mapDefaultParams(userProfileEntityObj);
    const savedUserMongoResult = await this.db
      .collection(this.collectionName)
      .insertOne(userProfileWithSchemaVersion);
    if (savedUserMongoResult.insertedCount) {
      return userProfileEntityObj;
    }
    throw new UnableToSave('', `Cannot save userProfile`);
  }

  private mapDefaultParams(userProfileObj: UserProfileEntity){
    const userProfileWithSchemaVersion: UserProfileEntity & SchemaVersionEntity = {
      ...userProfileObj,
      schemaVersion: AppConfig.currentUserSchemaVersion
    }
    return userProfileWithSchemaVersion;
  }
}
