export interface UserData {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly birthDate?: string;
  readonly createdDate?: string;

  readonly lastModifiedDate?: string;
}

export class UserDataBuilder {
  private firstName?: string;
  private lastName?: string;
  private birthDate?: string;
  // TODO find a type to interact with DateTime in API
  private createdDate?: string;
  private lastModifiedDate?: string;

  setFirstName(firstName: string): UserDataBuilder {
    this.firstName = firstName;
    return this;
  }
  setLastName(lastName: string): UserDataBuilder {
    this.lastName = lastName;
    return this;
  }
  setBirthDate(birthDate: string): UserDataBuilder {
    this.birthDate = birthDate;
    return this;
  }
  setCreatedDate(createdDate: string): UserDataBuilder {
    this.createdDate = createdDate;
    return this;
  }
  setLastModifiedDate(lastModifiedDate: string): UserDataBuilder {
    this.lastModifiedDate = lastModifiedDate;
    return this;
  }
  build(): UserData {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      createdDate: this.createdDate,
      lastModifiedDate: this.lastModifiedDate,
    };
  }
}
