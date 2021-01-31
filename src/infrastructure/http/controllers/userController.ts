/* eslint-disable class-methods-use-this */
import { JsonController, Body, Post, Get } from 'routing-controllers';
import UserProfileDTO from '@main/infrastructure/dto/userProfileDto';
import UserProfileService from '@main/application-service/userProfile/userProfileService';
import UserProfileMongoRepository from '@main/infrastructure/database/repositories/userProfile/userProfileMongoRepository';
import connectToDatabase from '@main/infrastructure/database/databaseConnection';

@JsonController('/users')
export default class UserController {
  
  
  @Post('')
  public async createUser(@Body() userProfileDtoObj: UserProfileDTO) {
    const dbConnection = await connectToDatabase();
    const userProfileApplicationService = new UserProfileService(
      new UserProfileMongoRepository(dbConnection),
    );
    return userProfileApplicationService.createUserProfile(userProfileDtoObj);
  }

  @Get('')
  public async getAllUsers(){
    const dbConnection = await connectToDatabase();
    const userProfileApplicationService = new UserProfileService(
      new UserProfileMongoRepository(dbConnection),
    );
    return userProfileApplicationService.getAllUserProfiles();
  }
}
