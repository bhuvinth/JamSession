import JamInMemoryRepository from '../../infrastructure/database/repositories/jam/jamInMemoryRepository';
import JamDto from '../../infrastructure/dto/jamDto';
import { SongDto, SongRoleDto } from '../../infrastructure/dto/songDto';
import JamService from './jamService';

describe('Test JamService with In Memory Repository', () => {
  let jamService: JamService = null;
  beforeEach(() => {
    jamService = new JamService(new JamInMemoryRepository());
  });

  async function createJamAndTest(jamCreatorUserId = 'UserId1'): Promise<JamDto> {
    const songRoleDtoObj1 = new SongRoleDto();
    songRoleDtoObj1.isRequired = true;
    songRoleDtoObj1.role = 'Guitarist';
    songRoleDtoObj1.assignedUserId = undefined;

    const songDtoObj = new SongDto();
    songDtoObj.name = 'GuitarOnlySong';
    songDtoObj.notes = 'Play Guitar and Chill';
    songDtoObj.songRoles = [songRoleDtoObj1];

    const createJamInput = new JamDto();
    createJamInput.jamCreatorUserId = jamCreatorUserId;
    createJamInput.jamSong = songDtoObj;

    const createdJamDto = await jamService.createJam(createJamInput);
    expect(createdJamDto).toBeDefined();

    createJamInput.jamId = createdJamDto.jamId;
    createJamInput.jamSong.id = createdJamDto.jamSong.id;

    expect(createdJamDto).toStrictEqual(createJamInput);
    return createdJamDto;
  }

  test('Should create a Jam with valid input', async () => {
    await createJamAndTest();
  });

  test('Should assign a valid user Id to the given Song Role', async () => {
    const mockCreatorUserId = 'creatorUserProfileId1';
    const assigneeUserId = 'assigneeProfileId1';
    const createdJamDto = await createJamAndTest(mockCreatorUserId);
    const isAssignedSuccesfully = await jamService.assignUserToSongRole(
      createdJamDto.jamId,
      createdJamDto.jamSong.songRoles[0].role,
      assigneeUserId,
    );

    expect(isAssignedSuccesfully).toBe(true);
  });

  test('Should be able to Start the jam for Assigned users to Required Roles', async () => {
    const mockCreatorUserId = 'creatorUserProfileId1';
    const assigneeUserId = 'assigneeProfileId1';
    const createdJamDto = await createJamAndTest(mockCreatorUserId);
    const isAssignedSuccesfully = await jamService.assignUserToSongRole(
      createdJamDto.jamId,
      createdJamDto.jamSong.songRoles[0].role,
      assigneeUserId,
    );

    expect(isAssignedSuccesfully).toBe(true);

    const startJamResponse = await jamService.startMyJam(createdJamDto.jamId, mockCreatorUserId);

    expect(startJamResponse).toBe(true);
  });
});
