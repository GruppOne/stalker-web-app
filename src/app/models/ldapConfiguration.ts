export interface LdapConfiguration {
  readonly host: string;
  readonly username?: string;
  readonly password?: string;
}

export class LdapConfigurationBuilder {
  private username?: string;

  private password?: string;

  constructor(private host: string) {}

  setHost(host: string): LdapConfigurationBuilder {
    this.host = host;
    return this;
  }
  setUsername(username: string): LdapConfigurationBuilder {
    this.username = username;
    return this;
  }

  setPassword(password: string): LdapConfigurationBuilder {
    this.password = password;
    return this;
  }
  build(): LdapConfiguration {
    return {
      host: this.host,
      username: this.username,
      password: this.password,
    };
  }
}
