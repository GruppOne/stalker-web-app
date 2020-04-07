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

  addFirstName(firstName: string): UserDataBuilder {
    this.firstName = firstName;
    return this;
  }
  addLastName(lastName: string): UserDataBuilder {
    this.lastName = lastName;
    return this;
  }
  addBirthDate(birthDate: string): UserDataBuilder {
    this.birthDate = birthDate;
    return this;
  }
  addCreatedDate(createdDate: string): UserDataBuilder {
    this.createdDate = createdDate;
    return this;
  }
  addLastModifiedDate(lastModifiedDate: string): UserDataBuilder {
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
