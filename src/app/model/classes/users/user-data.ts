export interface UserData {
  readonly email?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly birthDate?: string;
  readonly creationDateTime?: string;

  readonly lastChangeDateTime?: string;
}

export class UserDataBuilder {
  private email?: string;
  private firstName?: string;
  private lastName?: string;
  private birthDate?: string;
  // TODO find a type to interact with DateTime in API
  private creationDateTime?: string;
  private lastChangeDateTime?: string;

  addEmail(email: string): UserDataBuilder {
    this.email = email;
    return this;
  }
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
  addCreatedDate(creationDateTime: string): UserDataBuilder {
    this.creationDateTime = creationDateTime;
    return this;
  }
  addLastModifiedDate(lastChangeDateTime: string): UserDataBuilder {
    this.lastChangeDateTime = lastChangeDateTime;
    return this;
  }
  build(): UserData {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      creationDateTime: this.creationDateTime,
      lastChangeDateTime: this.lastChangeDateTime,
    };
  }
}
