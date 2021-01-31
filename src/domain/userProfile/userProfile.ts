import UserProfileEntity, { ContactDetailEntity } from '@main/infrastructure/database/entities/userProfileEntity';
import UserProfileDTO, { ContactDetailDTO } from '@main/infrastructure/dto/userProfileDto';
import JamRole from './valueObjects/jamRole';
import UserName from './valueObjects/userName';
import Password from './valueObjects/password';
import Ulid from '../common/valueObjects/ulid';

export default class UserProfile {
  public userId: Ulid;

  public firstName: string;

  public lastName: string;

  public userName: UserName;

  public password: Password;

  public jamRoles: JamRole;

  public contactDetails: ContactDetails;

  private constructor(
    userId: Ulid,
    firstName: string,
    lastName: string,
    userName: UserName,
    password: Password,
    jamRoles: JamRole,
    contactDetails: ContactDetails
  ) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this.jamRoles = jamRoles;
    this.contactDetails = contactDetails;
  }

  public static createUserProfile(profileInput: UserProfileDTO): UserProfile {
    const newUserProfile = new UserProfile(
      Ulid.create(),
      profileInput.firstName,
      profileInput.lastName,
      UserName.create(profileInput.userName),
      Password.create(profileInput.password),
      JamRole.create(profileInput.jamRole),
      ContactDetails.create(profileInput.contactDetails)
    );
    return newUserProfile;
  }

  public static fromEntity(userProfileEntityObj: UserProfileEntity) {
    const userId = Ulid.fromPersistence(userProfileEntityObj._id);
    const userName = UserName.create(userProfileEntityObj.userName);
    const password = Password.create(userProfileEntityObj.password);
    const jamRole = JamRole.fromPersistence(userProfileEntityObj.jamRole);
    const contactDetails = ContactDetails.fromEntity(userProfileEntityObj.contactDetails);

    const userProfile = new UserProfile(
      userId,
      userProfileEntityObj.firstName,
      userProfileEntityObj.lastName,
      userName,
      password,
      jamRole,
     contactDetails
    );
    return userProfile;
  }
}

export class ContactDetails { 
  public mobile: string;
  public phone: string;
  public email: string;

  private constructor(mobile: string, phone: string, email:string){
    this.mobile = mobile;
    this.phone = phone;
    this.email = email;
  }

  public static fromEntity(contactDetailsEntity: ContactDetailEntity){
    return new ContactDetails(contactDetailsEntity.mobile, contactDetailsEntity.phone, contactDetailsEntity.email);
  }

  public static create(contactDetailsInput: ContactDetailDTO){
    return new ContactDetails(contactDetailsInput.mobile, contactDetailsInput.phone, contactDetailsInput.email);
  }
}
