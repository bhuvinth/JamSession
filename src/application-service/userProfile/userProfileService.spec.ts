import UserProfileService from './userProfileService';
import UserProfileInMemoryRepository from '../../infrastructure/database/repositories/userProfile/userProfileInMemoryRepository';
import UserProfileDto from '../../infrastructure/dto/userProfileDto';

describe('Tests for userProfileService', () => {
  let userProfileService: UserProfileService = null;

  beforeEach(() => {
    userProfileService = new UserProfileService(new UserProfileInMemoryRepository());
  });

  async function createInitialUserProfileAndTest(userName = 'abc@gmail.com') {
    const userProfileDtoObj = new UserProfileDto();
    userProfileDtoObj.firstName = 'firstName';
    userProfileDtoObj.jamRole = 'Guitarist';
    userProfileDtoObj.lastName = 'lastName';
    userProfileDtoObj.password = 'User@123';
    userProfileDtoObj.userName = userName;
    userProfileDtoObj.contactDetails.mobile = '0172432322';
    
    const createdUserProfile = await userProfileService.createUserProfile(userProfileDtoObj);
    expect(createdUserProfile).toBeDefined();
    userProfileDtoObj.userId = createdUserProfile.userId;
    expect(createdUserProfile).toEqual(userProfileDtoObj);
    return createdUserProfile;
  }

  test('Test User Profile with valid values created Successfully', async () => {
    await createInitialUserProfileAndTest();
  });
});
