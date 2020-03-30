export class LdapConfiguration {
  private host: string;
  private username: string;
  private password: string;
  constructor(host = '192.168.0.1', username = 'admin', password = 'root') {
    this.host = host;
    this.username = username;
    this.password = password;
  }
  get Host(): string {
    return this.host;
  }
  set Host(host: string) {
    this.host = host;
  }

  get Username(): string {
    return this.username;
  }
  set Username(username: string) {
    this.username = username;
  }

  get Password(): string {
    return this.password;
  }
  set Password(password: string) {
    this.password = password;
  }
}
