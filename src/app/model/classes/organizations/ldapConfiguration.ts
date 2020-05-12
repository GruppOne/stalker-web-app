export interface LdapConfiguration {
  readonly host: string;
  readonly username?: string;
  readonly password?: string;
}

export class LdapConfigurationBuilder {
  private username?: string;

  private password?: string;

  constructor(private host: string) {}

  addHost(host: string): LdapConfigurationBuilder {
    this.host = host;
    return this;
  }
  addUsername(username: string): LdapConfigurationBuilder {
    this.username = username;
    return this;
  }

  addPassword(password: string): LdapConfigurationBuilder {
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
