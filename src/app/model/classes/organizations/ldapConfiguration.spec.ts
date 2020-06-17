import {LdapConfigurationBuilder} from './ldapConfiguration';

describe('LdapConfiguration', () => {
  const ldapConfigurationBuilder = new LdapConfigurationBuilder('192.168.0.1');
  it('should create an instance', () => {
    expect(ldapConfigurationBuilder.build()).toBeTruthy();
  });
  it('should set and get fields correctly', () => {
    const newUrl = 'localhost';
    const newbaseDn = 'dc=stalker,dc=com';
    const newbindRdn = 'admin';
    const newPassword = 'notApassword1!';

    ldapConfigurationBuilder.addUrl(newUrl);
    ldapConfigurationBuilder.addDn(newbaseDn);
    ldapConfigurationBuilder.addbindRdn(newbindRdn);
    ldapConfigurationBuilder.addPassword(newPassword);

    const ldapConfiguration = ldapConfigurationBuilder.build();

    expect(ldapConfiguration.url).toEqual(newUrl);
    expect(ldapConfiguration.baseDn).toEqual(newbaseDn);
    expect(ldapConfiguration.bindRdn).toEqual(newbindRdn);
    expect(ldapConfiguration.bindPassword).toEqual(newPassword);
  });
});
