export interface LdapConfiguration {
  readonly url: string;
  readonly searchQuery?: string;
  readonly bindDn?: string;
  readonly bindPassword?: string;
}

export class LdapConfigurationBuilder {
  private searchQuery?: string;

  private bindDn?: string;

  private bindPassword?: string;

  constructor(private url: string) {}

  addHost(url: string): LdapConfigurationBuilder {
    this.url = url;
    return this;
  }
  addUsername(searchQuery: string): LdapConfigurationBuilder {
    this.searchQuery = searchQuery;
    return this;
  }

  addPassword(bindPassowrd: string): LdapConfigurationBuilder {
    this.bindPassword = bindPassowrd;
    return this;
  }
  addDn(bindDn: string): LdapConfigurationBuilder {
    this.bindDn = bindDn;
    return this;
  }
  build(): LdapConfiguration {
    return {
      url: this.url,
      searchQuery: this.searchQuery,
      bindDn: this.bindDn,
      bindPassword: this.bindPassword,
    };
  }
}
