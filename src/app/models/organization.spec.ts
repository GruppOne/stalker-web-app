import {LdapConfigurationBuilder} from './ldapConfiguration';
import {OrganizationBuilder} from './organization';
import {PlaceBuilder} from './place';

describe('Organization', () => {
  const organizationBuilder = new OrganizationBuilder('imola', true);
  it('should create an instance', () => {
    expect(organizationBuilder.build()).toBeTruthy();
  });
  it('should set and get fields correctly', () => {
    const newId = -2;
    const newName = 'NewTest';
    const newDescription = 'Test description';
    const newLdapConfiguration = new LdapConfigurationBuilder('127.0.0.1').build();
    const newPlaces = [new PlaceBuilder([]).build(), new PlaceBuilder([]).build()];
    const newIsPrivate = false;
    const newCreatedDate = '2020-05-21';
    const newLastModifiedDate = '2020-05-21';
    organizationBuilder.addId(newId);
    organizationBuilder.addName(newName);
    organizationBuilder.addDescription(newDescription);
    organizationBuilder.addLdapConfiguration(newLdapConfiguration);
    organizationBuilder.addPlaces(newPlaces);
    organizationBuilder.addPlaces(newPlaces);
    organizationBuilder.addIsPrivate(newIsPrivate);
    organizationBuilder.addCreatedDate(newCreatedDate);
    organizationBuilder.addLastModifiedDate(newLastModifiedDate);
    const organization = organizationBuilder.build();
    expect(organization.id).toEqual(newId);
    expect(organization.name).toEqual(newName);
    expect(organization.description).toEqual(newDescription);
    expect(organization.ldapConfiguration).toEqual(newLdapConfiguration);
    expect(organization.places).toEqual(organization.places);
    expect(organization.isPrivate).toEqual(newIsPrivate);
    expect(organization.createdDate).toEqual(newCreatedDate);
    expect(organization.lastModifiedDate).toEqual(newLastModifiedDate);
  });
});
