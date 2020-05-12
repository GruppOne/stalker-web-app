import {LdapConfigurationBuilder} from './ldapConfiguration';

describe('LdapConfiguration', () => {
  const ldapConfigurationBuilder = new LdapConfigurationBuilder('192.168.0.1');
  it('should create an instance', () => {
    expect(ldapConfigurationBuilder.build()).toBeTruthy();
  });
  it('should set and get fields correctly', () => {
    const newHost = '192.168.1.1';
    const newUsername = 'GruppOne';
    const newPassword = 'notApassword1!';

    ldapConfigurationBuilder.addHost(newHost);
    ldapConfigurationBuilder.addUsername(newUsername);
    ldapConfigurationBuilder.addPassword(newPassword);

    const ldapConfiguration = ldapConfigurationBuilder.build();

    expect(ldapConfiguration.host).toEqual(newHost);
    expect(ldapConfiguration.username).toEqual(newUsername);
    expect(ldapConfiguration.password).toEqual(newPassword);
  });
});
