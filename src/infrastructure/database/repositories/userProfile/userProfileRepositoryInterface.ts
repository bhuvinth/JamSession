import UserProfileEntity from '../../entities/userProfileEntity';

export default interface UserProfileRepositoryInterface {
  addUserProfile(userProfileEntityObj: UserProfileEntity): Promise<UserProfileEntity>;
  getUserProfiles(): Promise<UserProfileEntity[]>;
}
