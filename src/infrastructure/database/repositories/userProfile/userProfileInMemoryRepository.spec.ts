import UserProfileEntity from '../../entities/userProfileEntity';
import UserProfileRepositoryInterface from './userProfileRepositoryInterface';
import UserProfileInMemoryRepository from './userProfileInMemoryRepository';
import UserNameAlreadyExists from '../../errors/userNameAlreadyExists';

describe('Test User profile In Memory Repository', () => {
  let userProfileRepository: UserProfileRepositoryInterface = null;
  beforeEach(() => {
    userProfileRepository = new UserProfileInMemoryRepository();
  });

  async function createInitialUserProfileAndTest(userName = 'user1@gmail.com') {
    const userProfileEntityObj = new UserProfileEntity();
    userProfileEntityObj.firstName = 'firstName';
    userProfileEntityObj._id = '1';
    userProfileEntityObj.jamRole = ['Guitarist'];
    userProfileEntityObj.lastName = 'lastName';
    userProfileEntityObj.password = 'User@123';
    userProfileEntityObj.userName = userName;

    const createdUserProfile = await userProfileRepository.addUserProfile(userProfileEntityObj);
    expect(createdUserProfile).toBeDefined();
    expect(createdUserProfile).toEqual(userProfileEntityObj);
    return createdUserProfile;
  }

  test('Test adding a userProfile which doesnt exist', async () => {
    await createInitialUserProfileAndTest();
  });

  test('Test user profile with existing user name cannot be created', async () => {
    const mockUserName = 'alreadyExists@user.com';
    const createdUserName = await createInitialUserProfileAndTest(mockUserName);
    const newUserProfileToBeCreated = createdUserName;
    newUserProfileToBeCreated._id = '2';
    const createDuplicateUserNamePromise = userProfileRepository.addUserProfile(
      newUserProfileToBeCreated,
    );
    expect(createDuplicateUserNamePromise).rejects.toThrow(UserNameAlreadyExists);
  });
});
