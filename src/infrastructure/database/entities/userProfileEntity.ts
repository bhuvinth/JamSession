export default class UserProfileEntity{
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public _id: string;

  public firstName: string;

  public lastName: string;

  public userName: string;

  public password: string;

  public jamRole: string[];

  public contactDetails: ContactDetailEntity;
}

export class ContactDetailEntity { 
  public phone: string;
  public email: string;
  public mobile: string;
}