import {LdapConfigurationBuilder} from './ldapConfiguration';
import {OrganizationDataBuilder} from './organization-data';

describe('OrganizationData', () => {
  const organizationDataBuilder = new OrganizationDataBuilder('imola', 'private');

  it('should create an instance', () => {
    expect(organizationDataBuilder.build()).toBeTruthy();
  });
  it('should set and get fields correctly', () => {
    const newName = 'NewTest';
    const newDescription = 'Test description';
    const newLdapConfiguration = new LdapConfigurationBuilder('127.0.0.1').build();
    const newIsPrivate = 'public';
    const newCreatedDate = '1';
    const newLastModifiedDate = '1';
    organizationDataBuilder.addName(newName);
    organizationDataBuilder.addDescription(newDescription);
    organizationDataBuilder.addLdapConfiguration(newLdapConfiguration);
    organizationDataBuilder.addOrganizationType(newIsPrivate);
    organizationDataBuilder.addCreatedDate(newCreatedDate);
    organizationDataBuilder.addLastModifiedDate(newLastModifiedDate);
    const organization = organizationDataBuilder.build();
    expect(organization.name).toEqual(newName);
    expect(organization.description).toEqual(newDescription);
    expect(organization.ldapConfiguration).toEqual(newLdapConfiguration);
    expect(organization.organizationType).toEqual(newIsPrivate);
    expect(organization.creationDateTime).toEqual(newCreatedDate);
    expect(organization.lastChangeDateTime).toEqual(newLastModifiedDate);
  });
});
