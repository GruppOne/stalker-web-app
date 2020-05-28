import {UserData} from './user-data';

// TODO user this?
// export interface UnauthenticatedUser {
//   readonly email: string;
//   readonly password: string;
// }

// export interface User extends Partial<UnauthenticatedUser> {
//   readonly email?: string;
//   readonly password?: string;
//   readonly id: number;
//   readonly userData?: UserData;
// }

export interface User {
  readonly id?: number;
  readonly data?: UserData;
}

export class UserBuilder {
  private id?: number;
  private data?: UserData;

  addId(id: number): UserBuilder {
    this.id = id;
    return this;
  }
  addUserData(userData: UserData): UserBuilder {
    this.data = userData;
    return this;
  }
  build(): User {
    return {
      id: this.id,
      data: this.data,
    };
  }
}
