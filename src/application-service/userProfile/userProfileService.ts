import UserProfile from '@main/domain/userProfile/userProfile';
import UserProfileEntity from '@main/infrastructure/database/entities/userProfileEntity';
import UserProfileRepositoryInterface from '@main/infrastructure/database/repositories/userProfile/userProfileRepositoryInterface';
import UserProfileDTO from '@main/infrastructure/dto/userProfileDto';

import UserProfileMapper from './userProfileMapper';

export default class UserProfileService {
  // eslint-disable-next-line no-useless-constructor
  public constructor(
    private userProfileRepositoryImpl: UserProfileRepositoryInterface, // eslint-disable-next-line no-empty-function
  ) {}

  public async createUserProfile(createUserProfileInput: UserProfileDTO): Promise<UserProfileDTO> {
    const userProfile = UserProfile.createUserProfile(createUserProfileInput);
    const userEntityObj = UserProfileMapper.fromDomainToEntity(userProfile);
    const createdUserProfile = await this.userProfileRepositoryImpl.addUserProfile(userEntityObj);
    const createdUserProfileDomainObj = UserProfile.fromEntity(createdUserProfile);
    return UserProfileMapper.fromDomainToDto(createdUserProfileDomainObj);
  }

  public async getAllUserProfiles():Promise<UserProfileDTO[]>{
    const userProfiles = await this.userProfileRepositoryImpl.getUserProfiles();
    const userProfileDtoArray:UserProfileDTO[] = userProfiles.map((userProfile:UserProfileEntity) =>{
      return UserProfileMapper.fromDomainToDto(UserProfile.fromEntity(userProfile));
    });
    console.log('2222222222',userProfileDtoArray);
    return userProfileDtoArray;
  }
}
