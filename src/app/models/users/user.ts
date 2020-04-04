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
  readonly email: string;
  readonly password: string;
  // TODO find a way to use unsigned int numbers
  readonly id?: number;
  readonly userData?: UserData;
}

export class UserBuilder {
  private id?: number;
  private userData?: UserData;

  constructor(private email: string, private password: string) {}

  addEmail(email: string): UserBuilder {
    this.email = email;
    return this;
  }
  addPassword(password: string): UserBuilder {
    this.password = password;
    return this;
  }
  addId(id: number): UserBuilder {
    this.id = id;
    return this;
  }
  addUserData(userData: UserData): UserBuilder {
    this.userData = userData;
    return this;
  }
  build(): User {
    return {
      email: this.email,
      password: this.password,
      id: this.id,
      userData: this.userData,
    };
  }
}
