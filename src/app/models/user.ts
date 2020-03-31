import {UserData} from './user-data';

export class User {
  /*   private id: number;
  private mail: string;
  private password: string;
  private userData: UserData; */
  constructor(
    private mail = 'default',
    private password = 'default',
    private readonly id = -1,
    private userData = new UserData(),
  ) {
    /*     this._id = id;
    this._mail = mail;
    this.password = password;
    this.userData = userData; */
  }
  get Id(): number {
    return this.id;
  }
  /*   set Id(id: number) {
    this.id = id;
  } */
  get Mail(): string {
    return this.mail;
  }
  set Mail(mail: string) {
    this.mail = mail;
  }
  get Password(): string {
    return this.password;
  }
  set Password(password: string) {
    this.password = password;
  }
  get UserData(): UserData {
    return this.userData;
  }
  set UserData(userData: UserData) {
    this.userData = userData;
  }
}
