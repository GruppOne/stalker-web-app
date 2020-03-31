import {UserData} from './user-data';

export class User {
  constructor(
    // TODO use builder pattern and refactor to NOT have default
    private mail = 'default',
    private password = 'default',
    private readonly id = -1,
    private userData = new UserData(),
  ) {}
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
