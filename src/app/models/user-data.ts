export class UserData {
  constructor(
    private firstName = 'Mario',
    private lastName = 'Rossi',
    private birthDate = '1980-01-01',
    private createdDate = '1980-01-01T09:01:01Z',
    private lastModifiedDate = '1980-01-01T09:01:01Z',
  ) {}

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
