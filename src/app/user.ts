export class User {
  private id: number;
  private email: string;
  private password: string;
  constructor(email = 'default', password = 'default') {
    this.id = -1;
    this.email = email;
    this.password = password;
  }
  getId(): number {
    return this.id;
  }
  getEmail(): string {
    return this.email;
  }
  getPassword(): string {
    return this.password;
  }
}
