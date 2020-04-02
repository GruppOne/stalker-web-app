import {UserData} from './user-data';

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

  setEmail(email: string): UserBuilder {
    this.email = email;
    return this;
  }
  setPassword(password: string): UserBuilder {
    this.password = password;
    return this;
  }
  setId(id: number): UserBuilder {
    this.id = id;
    return this;
  }
  setUserData(userData: UserData): UserBuilder {
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
