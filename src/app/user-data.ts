export class UserData {
  private firstName: string;
  private lastName: string;
  private birthDate: string;
  private createdDate: string;
  private lastModifiedDate: string;
  constructor(
    firstName = 'Mario',
    lastName = 'Rossi',
    birthDate = '1980-01-01',
    createdDate = '1980-01-01T09:01:01Z',
    lastModifiedDate = '1980-01-01T09:01:01Z',
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.createdDate = createdDate;
    this.lastModifiedDate = lastModifiedDate;
  }

  get FirstName(): string {
    return this.firstName;
  }
  set FirstName(firstName: string) {
    this.firstName = firstName;
  }
  get LastName(): string {
    return this.lastName;
  }
  set LastName(lastName: string) {
    this.lastName = lastName;
  }
  get BirthDate(): string {
    return this.birthDate;
  }
  set BirthDate(birthDate: string) {
    this.birthDate = birthDate;
  }
  get CreatedDate(): string {
    return this.createdDate;
  }
  set CreatedDate(createdDate: string) {
    this.createdDate = createdDate;
  }
  get LastModifiedDate(): string {
    return this.lastModifiedDate;
  }
  set LastModifiedDate(lastModifiedDate: string) {
    this.lastModifiedDate = lastModifiedDate;
  }
}
