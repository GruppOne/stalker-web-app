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

  getFirstName(): string {
    return this.firstName;
  }
  getLastName(): string {
    return this.lastName;
  }
  getBirthDate(): string {
    return this.birthDate;
  }
  getCreatedDate(): string {
    return this.createdDate;
  }
  getLastModifiedDate(): string {
    return this.lastModifiedDate;
  }
  setFirstName(firstName: string): void {
    this.firstName = firstName;
  }
  setLastName(lastName: string): void {
    this.lastName = lastName;
  }
  setBirthDate(birthDate: string): void {
    this.birthDate = birthDate;
  }
  setCreatedDate(createdDate: string): void {
    this.createdDate = createdDate;
  }
  setLastModifiedDate(lastModifiedDate: string): void {
    this.lastModifiedDate = lastModifiedDate;
  }
}
