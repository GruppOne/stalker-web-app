import {LdapConfigurationBuilder} from './ldapConfiguration';

describe('LdapConfiguration', () => {
  const ldapConfigurationBuilder = new LdapConfigurationBuilder('192.168.0.1');
  it('should create an instance', () => {
    expect(ldapConfigurationBuilder.build()).toBeTruthy();
  });
  it('should set and get fields correctly', () => {
    const newUrl = '192.168.1.1';
    const newSearchQuery = 'GruppOne';
    const newDn = 'com';
    const newPassword = 'notApassword1!';

    ldapConfigurationBuilder.addUrl(newUrl);
    ldapConfigurationBuilder.addSearchQuery(newSearchQuery);
    ldapConfigurationBuilder.addDn(newDn);
    ldapConfigurationBuilder.addPassword(newPassword);

    const ldapConfiguration = ldapConfigurationBuilder.build();

    expect(ldapConfiguration.url).toEqual(newUrl);
    expect(ldapConfiguration.searchQuery).toEqual(newSearchQuery);
    expect(ldapConfiguration.bindDn).toEqual(newDn);
    expect(ldapConfiguration.bindPassword).toEqual(newPassword);
  });
});
