import { IsDefined, IsObject } from 'class-validator';

export class ContactDetailDTO {  
  public mobile: string;
  public email: string;
  public phone: string;
}

export default class UserProfileDTO {
  public userId: string;

  @IsDefined()
  public firstName: string;

  @IsDefined()
  public lastName: string;

  @IsDefined()
  public userName: string;

  @IsDefined()
  public password: string;

  @IsDefined()
  public jamRole: string;

  @IsDefined()
  @IsObject()
  public contactDetails: ContactDetailDTO;
}

