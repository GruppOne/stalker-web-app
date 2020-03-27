export class User {
  private id: number;
  private mail: string;
  private password: string;
  constructor(email = 'default', password = 'default') {
    this.id = -1;
    this.mail = email;
    this.password = password;
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
}
