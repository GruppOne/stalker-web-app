import {LdapConfigurationBuilder} from './ldapConfiguration';
import {OrganizationBuilder} from './organization';
import {OrganizationDataBuilder} from './organization-data';

describe('Organization', () => {
  let organizationBuilder = new OrganizationBuilder(
    1,
    new OrganizationDataBuilder('imola', 'private').build(),
  );
  it('should create an instance', () => {
    expect(organizationBuilder.build()).toBeTruthy();
  });
  it('should set and get fields correctly', () => {
    const newId = -2;
    const newName = 'NewTest';
    const newDescription = 'Test description';
    const newLdapConfiguration = new LdapConfigurationBuilder('127.0.0.1').build();
    const newIsPrivate = 'public';
    const newCreatedDate = '1';
    const newLastModifiedDate = '1';
    const organizationDataBuilder = new OrganizationDataBuilder(newName, newIsPrivate);
    organizationBuilder.addId(newId);
    organizationDataBuilder.addName(newName);
    organizationDataBuilder.addDescription(newDescription);
    organizationDataBuilder.addLdapConfiguration(newLdapConfiguration);
    organizationDataBuilder.addOrganizationType(newIsPrivate);
    organizationDataBuilder.addCreatedDate(newCreatedDate);
    organizationDataBuilder.addLastModifiedDate(newLastModifiedDate);
    organizationBuilder = new OrganizationBuilder(newId, organizationDataBuilder.build());
    organizationBuilder.addOrganizationData(organizationDataBuilder.build());
    const organization = organizationBuilder.build();
    expect(organization.id).toEqual(newId);
    expect(organization.data.name).toEqual(newName);
    expect(organization.data.description).toEqual(newDescription);
    expect(organization.data.ldapConfiguration).toEqual(newLdapConfiguration);
    expect(organization.data.organizationType).toEqual(newIsPrivate);
    expect(organization.data.creationDateTime).toEqual(newCreatedDate);
    expect(organization.data.lastChangeDateTime).toEqual(newLastModifiedDate);
  });
});
