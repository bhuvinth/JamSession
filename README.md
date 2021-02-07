# JamSession
I wanted to try Domain driven design based code for a simple application.
Currently still this is a work in progress. 
But I am using this application to demo Schema versioning for the MongoDB. Please find the details here.

## Prerequisites
You will need to below dependencies for running this application: 
1. [install node.js](https://nodejs.org/en/download)

#### Install dependencies

To install all dependencies run the following command:
```
npm install
```

#### Starting application
```
npm run start
```
This application is based on ExpressJS.
For checking the working endpoints, Please find the postman export in the [repository](JamSession.postman_collection.json)
I have created for now 5 endpoints for now: 
 1. Creating User Profile
 2. Get All User Profiles
 3. Creating Jam
 4. Assigning user to the Song role
 5. Starting the Jam

#### Running the Tests:
```
npm run test
```
and for running the tests with Test coverage: 
```
npm run test:coverage
```

#### Schema Versioning example: 

[What is schema versioning?](https://www.mongodb.com/blog/post/building-with-patterns-the-schema-versioning-pattern)

So please find the example as below: 

We have a schema for User Profiles which looks like below:
```typescript
export default class UserProfileEntity { 
  public _id: string;

  public firstName: string;

  public lastName: string;

  public userName: string;

  public password: string;

  public jamRole: string[];

  public contactNumber: string = '030 303030';
}

```

We need to change the contactNumber property to an object now since the user can have several different ways to store in contact i.e. email, Mobile number etc. 
So the schema would look like: 

```typescript
export default class UserProfileEntity {
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

```

I have purposely not kept the properties optional so as to address and discuss the approach. 
But the original structure can be kept as we want and accordingly the map method such as below can handle the data:

```typescript
 async getUserProfiles(): Promise<UserProfileEntity[]> {
      const getUserResponse = await this.db.collection(this.collectionName).find();
      const userDataArray = await getUserResponse.toArray();
      return this.mapUserDataFromDifferentSchemas(userDataArray);
  }

  public mapUserDataFromDifferentSchemas(usersDataArray:any[]): UserProfileEntity[] {
    const versionedUserData: UserProfileEntity[] = usersDataArray.map((userData)=>{
      const userProfileObj:UserProfileEntity = userData;

      if(userData.schemaVersion < AppConfig.currentUserSchemaVersion) {
        userProfileObj.contactDetails = new ContactDetailEntity();
        userProfileObj.contactDetails.phone = userData.contactNumber;
        userProfileObj.contactDetails.mobile = '';
        userProfileObj.contactDetails.email = '';
        return userProfileObj;
      }

      userProfileObj.contactDetails = userData.contactDetails;

      return userProfileObj;
    })

    return versionedUserData;
  }

```
