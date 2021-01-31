import UserProfileEntity from '../../entities/userProfileEntity';
import UserProfileRepositoryInterface from './userProfileRepositoryInterface';
import UserNameAlreadyExists from '../../errors/userNameAlreadyExists';

export default class UserProfileInMemoryRepository implements UserProfileRepositoryInterface {
  
  getUserProfiles(): Promise<UserProfileEntity[]> {
    throw new Error('Method not implemented.');
  }
  private userProfileTable: UserProfileEntity[] = [];

  async addUserProfile(userProfileEntityObj: UserProfileEntity): Promise<UserProfileEntity> {
    if (await this.findUserProfileWithSameUserName(userProfileEntityObj.userName)) {
      throw new UserNameAlreadyExists(
        'userName',
        `${userProfileEntityObj.userName} already exists`,
      );
    }
    this.userProfileTable.push(userProfileEntityObj);
    return userProfileEntityObj;
  }

  private async findUserProfileWithSameUserName(
    userName: string,
  ): Promise<UserProfileEntity | undefined> {
    return this.userProfileTable.find(userProfile => userProfile.userName === userName);
  }
}
