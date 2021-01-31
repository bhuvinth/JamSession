import JamDto from '@main/infrastructure/dto/jamDto';
import Jam from '@main/domain/jam/jam';
import Song from '@main/domain/jam/song';
import JamRepositoryInterface from '@main/infrastructure/database/repositories/jam/jamRepositoryInterface';
import JamMapper from './jamMapper';

export default class JamService {
  private jamRepository!: JamRepositoryInterface;

  public constructor(jamRepository: JamRepositoryInterface) {
    this.jamRepository = jamRepository;
  }

  public async createJam(createJamInput: JamDto): Promise<JamDto> {
    const songDomainObj = Song.create(createJamInput.jamSong);
    const jamDomainObj = Jam.createJam(createJamInput, songDomainObj);
    const jamEntityObj = JamMapper.fromDomainToEntity(jamDomainObj);
    const createdJamEntity = await this.jamRepository.addJam(jamEntityObj);
    const createdJamDomainObj = Jam.fromEntity(createdJamEntity);
    return JamMapper.fromDomainToDto(createdJamDomainObj);
  }

  public async assignUserToSongRole(
    jamId: string,
    role: string,
    userProfileId: string,
  ): Promise<boolean> {
    const foundJam = await this.jamRepository.getJamById(jamId);
    const jamDomainObj = Jam.fromEntity(foundJam);
    jamDomainObj.jamSong.assignUserToSongRole(userProfileId, role);

    const jamEntityObj = JamMapper.fromDomainToEntity(jamDomainObj);
    const jamUpdated = await this.jamRepository.updateJam(jamEntityObj);
    return jamUpdated;
  }

  public async startMyJam(jamId: string, userProfileId: string): Promise<boolean> {
    const foundJam = await this.jamRepository.getJamById(jamId, userProfileId);
    const jamDomainObj = Jam.fromEntity(foundJam);
    jamDomainObj.startJam();
    const jamEnitityObj = JamMapper.fromDomainToEntity(jamDomainObj);
    const jamStarted = await this.jamRepository.updateJam(jamEnitityObj);
    return jamStarted;
  }
}
