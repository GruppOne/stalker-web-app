import {UserData} from './user-data';
export class User {
  private id: number;
  private mail: string;
  private password: string;
  private userData: UserData;
  constructor(
    email = 'default',
    password = 'default',
    id = -1,
    userData = new UserData(),
  ) {
    this.id = id;
    this.mail = email;
    this.password = password;
    this.userData = userData;
  }
  getId(): number {
    return this.id;
  }
  getEmail(): string {
    return this.mail;
  }
  getPassword(): string {
    return this.password;
  }
  getUserData(): UserData {
    return this.userData;
  }
  setId(id: number): void {
    this.id = id;
  }
  setEmail(mail: string): void {
    this.mail = mail;
  }
  setPassword(password: string): void {
    this.password = password;
  }
  setUserData(userData: UserData): void {
    this.userData = userData;
  }
}
