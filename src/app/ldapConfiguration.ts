export class LdapConfiguration {
  private host: string;
  private username: string;
  private password: string;
  constructor(host = 'ereditarieta', username = 'amadeus', password = 'pedro') {
    this.host = host;
    this.username = username;
    this.password = password;
  }
  getHost(): string {
    return this.host;
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }

  setHost(host: string): void {
    this.host = host;
  }

  setUsername(username: string): void {
    this.username = username;
  }

  setPassword(password: string): void {
    this.password = password;
  }
}
