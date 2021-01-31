import JamRepositoryInterface from './jamRepositoryInterface';
import JamInMemoryRepository from './jamInMemoryRepository';
import SongEntity, { SongRoleEntity } from '../../entities/songEntity';
import UlidGenerator from '../../../../utils/ulidGenerator';
import JamEntity from '../../entities/jamEntity';

describe('Test JamRepository', () => {
  let jamRepository: JamRepositoryInterface = null;
  beforeEach(() => {
    jamRepository = new JamInMemoryRepository();
  });

  async function createInitialJamAndTest(jamCreatorUserId = 'user1'): Promise<JamEntity> {
    const songRoleEntityObj1 = new SongRoleEntity();
    songRoleEntityObj1.role = 'Guitarist';
    songRoleEntityObj1.isRequired = true;

    const songRoleEntityObj2 = new SongRoleEntity();
    songRoleEntityObj2.role = 'Drummer';
    songRoleEntityObj2.isRequired = true;

    const songEntityObj = new SongEntity();
    songEntityObj.id = UlidGenerator.generateId();
    songEntityObj.name = 'Jai Ho';
    songEntityObj.notes = `This is a great song by Artist DJ Great.
    chords
    timing 
    instrument
    `;
    songEntityObj.roles = [songRoleEntityObj1, songRoleEntityObj2];

    const jamEntityObj = new JamEntity();
    jamEntityObj.jamCreatorUserId = jamCreatorUserId;
    jamEntityObj._id = UlidGenerator.generateId();
    jamEntityObj.jamSong = songEntityObj;

    const createdJam = await jamRepository.addJam(jamEntityObj);
    expect(createdJam).toBeDefined();
    expect(createdJam).toStrictEqual(jamEntityObj);
    return createdJam;
  }

  test('Should create jam for valid input', async () => {
    await createInitialJamAndTest();
  });

  test('Should update the data successfully', async () => {
    const mockCreatorId = 'UserProfileId1';
    const createdJam = await createInitialJamAndTest(mockCreatorId);

    createdJam.jamSong.name = 'Firework';

    const updatedResponse = await jamRepository.updateJam(createdJam);
    expect(updatedResponse).toBeTruthy();

    const updatedJam = await jamRepository.getJamById(createdJam._id, mockCreatorId);
    expect(updatedJam).toBeDefined();
    expect(updatedJam).toStrictEqual(createdJam);
  });

  test('Should get All the jams which are available', async () => {
    const mockJamCreator1 = 'JamCreateUserProfileId1';
    await createInitialJamAndTest(mockJamCreator1);
    const mockJamCreator2 = 'JamCreateUserProfileId1';
    await createInitialJamAndTest(mockJamCreator2);

    const createdJamArray = await jamRepository.getJams();
    expect(createdJamArray).toBeDefined();
    expect(createdJamArray).toHaveLength(2);
  });
});
