export interface LoginData {
  readonly email: string;
  readonly password: string;
}

export class LoginDataBuilder {
  constructor(private email: string, private password: string) {}

  addEmail(email: string): LoginDataBuilder {
    this.email = email;
    return this;
  }
  addPassword(password: string): LoginDataBuilder {
    this.password = password;
    return this;
  }
  build(): LoginData {
    return {
      email: this.email,
      password: this.password,
    };
  }
}
