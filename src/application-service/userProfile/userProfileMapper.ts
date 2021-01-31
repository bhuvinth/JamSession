import AppConfig from '@main/config/appConfig';
import UserProfile from '@main/domain/userProfile/userProfile';
import UserProfileEntity, {
  ContactDetailEntity,
} from '@main/infrastructure/database/entities/userProfileEntity';
import UserProfileDTO, { ContactDetailDTO } from '@main/infrastructure/dto/userProfileDto';

export default class UserProfileMapper {
  public static fromDomainToEntity(userProfileDomainObj: UserProfile): UserProfileEntity {
    const contactDetailsEntity = new ContactDetailEntity();
    contactDetailsEntity.mobile = userProfileDomainObj.contactDetails.mobile;
    contactDetailsEntity.phone = userProfileDomainObj.contactDetails.phone;
    contactDetailsEntity.email = userProfileDomainObj.contactDetails.email;

    const userProfileEntityObj: UserProfileEntity = {
      firstName: userProfileDomainObj.firstName,
      _id: userProfileDomainObj.userId.value,
      jamRole: userProfileDomainObj.jamRoles.value,
      lastName: userProfileDomainObj.lastName,
      password: userProfileDomainObj.password.value,
      userName: userProfileDomainObj.userName.value,
      contactDetails: contactDetailsEntity,
    };
    

    userProfileEntityObj.contactDetails = contactDetailsEntity;
    return userProfileEntityObj;
  }

  public static fromDomainToDto(userProfileDomainObj: UserProfile): UserProfileDTO {
    const userProfileDtoObj = new UserProfileDTO();
    userProfileDtoObj.firstName = userProfileDomainObj.firstName;
    userProfileDtoObj.userId = userProfileDomainObj.userId.value;
    [userProfileDtoObj.jamRole] = userProfileDomainObj.jamRoles.value;
    userProfileDtoObj.lastName = userProfileDomainObj.lastName;
    userProfileDtoObj.password = userProfileDomainObj.password.value;
    userProfileDtoObj.userName = userProfileDomainObj.userName.value;

    const contactDetailsDtoObj = new ContactDetailDTO();
    contactDetailsDtoObj.mobile = userProfileDomainObj.contactDetails.mobile;
    contactDetailsDtoObj.phone = userProfileDomainObj.contactDetails.phone;
    contactDetailsDtoObj.email = userProfileDomainObj.contactDetails.email;
    userProfileDtoObj.contactDetails = contactDetailsDtoObj;

    return userProfileDtoObj;
  }
}
