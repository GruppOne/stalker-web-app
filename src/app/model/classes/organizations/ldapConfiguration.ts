export interface LdapConfiguration {
  readonly url: string;
  readonly baseDn?: string;
  readonly bindRdn?: string;
  readonly bindPassword?: string;
}

export class LdapConfigurationBuilder {
  private baseDn?: string;

  private bindRdn?: string;

  private bindPassword?: string;

  constructor(private url: string) {}

  addUrl(url: string): LdapConfigurationBuilder {
    this.url = url;
    return this;
  }
  addDn(baseDn: string): LdapConfigurationBuilder {
    this.baseDn = baseDn;
    return this;
  }
  addbindRdn(bindRdn: string): LdapConfigurationBuilder {
    this.bindRdn = bindRdn;
    return this;
  }
  addPassword(bindPassowrd: string): LdapConfigurationBuilder {
    this.bindPassword = bindPassowrd;
    return this;
  }
  build(): LdapConfiguration {
    return {
      url: this.url,
      baseDn: this.baseDn,
      bindRdn: this.bindRdn,
      bindPassword: this.bindPassword,
    };
  }
}
