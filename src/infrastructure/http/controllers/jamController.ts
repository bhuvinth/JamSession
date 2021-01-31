/* eslint-disable @typescript-eslint/indent */
/* eslint-disable class-methods-use-this */
import { JsonController, BodyParam, Body, Post, Put } from 'routing-controllers';
import JamDto from '@main/infrastructure/dto/jamDto';
import JamService from '@main/application-service/jam/jamService';
import connectToDatabase from '@main/infrastructure/database/databaseConnection';
import JamMongoRepository from '@main/infrastructure/database/repositories/jam/jamMongoRepository';
// import StartJamDto from '@main/infrastructure/dto/startJamDto';

@JsonController('/jams')
export default class JamController {
  @Put('/assignUserToRole')
  public async assignUserToRole(
    @BodyParam('jamId') jamId: string,
    @BodyParam('role') role: string,
    @BodyParam('userId') userProfileId: string,
  ) {
    const dbConnection = await connectToDatabase();
    const jamApplicationService = new JamService(new JamMongoRepository(dbConnection));
    const isUserAssigned = await jamApplicationService.assignUserToSongRole(
      jamId,
      role,
      userProfileId,
    );

    return { userAssigned: isUserAssigned };
  }

  @Put('/start')
  public async startJam(
    @BodyParam('jamId') jamId: string,
    @BodyParam('userId') userProfileId: string,
  ) {
    const dbConnection = await connectToDatabase();
    const jamApplicationService = new JamService(new JamMongoRepository(dbConnection));
    const isJamStarted = await jamApplicationService.startMyJam(jamId, userProfileId);
    return { jamStarted: isJamStarted };
  }

  @Post('')
  public async createJam(@Body() jamDtoObj: JamDto) {
    const dbConnection = await connectToDatabase();
    const jamApplicationService = new JamService(new JamMongoRepository(dbConnection));
    return jamApplicationService.createJam(jamDtoObj);
  }
}
