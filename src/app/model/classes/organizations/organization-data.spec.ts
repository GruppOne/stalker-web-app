import {PlaceBuilder} from '../places/place';

import {LdapConfigurationBuilder} from './ldapConfiguration';
import {OrganizationDataBuilder} from './organization-data';

describe('OrganizationData', () => {
  const organizationDataBuilder = new OrganizationDataBuilder('imola', true);
  it('should create an instance', () => {
    expect(organizationDataBuilder.build()).toBeTruthy();
  });
  it('should set and get fields correctly', () => {
    const newName = 'NewTest';
    const newDescription = 'Test description';
    const newLdapConfiguration = new LdapConfigurationBuilder('127.0.0.1').build();
    const newPlaces = [new PlaceBuilder([]).build(), new PlaceBuilder([]).build()];
    const newIsPrivate = false;
    const newCreatedDate = 1;
    const newLastModifiedDate = 1;
    organizationDataBuilder.addName(newName);
    organizationDataBuilder.addDescription(newDescription);
    organizationDataBuilder.addLdapConfiguration(newLdapConfiguration);
    organizationDataBuilder.addPlaces(newPlaces);
    organizationDataBuilder.addPlaces(newPlaces);
    organizationDataBuilder.addIsPrivate(newIsPrivate);
    organizationDataBuilder.addCreatedDate(newCreatedDate);
    organizationDataBuilder.addLastModifiedDate(newLastModifiedDate);
    const organization = organizationDataBuilder.build();
    expect(organization.name).toEqual(newName);
    expect(organization.description).toEqual(newDescription);
    expect(organization.ldapConfiguration).toEqual(newLdapConfiguration);
    expect(organization.places).toEqual(organization.places);
    expect(organization.isPrivate).toEqual(newIsPrivate);
    expect(organization.createdDate).toEqual(newCreatedDate);
    expect(organization.lastModifiedDate).toEqual(newLastModifiedDate);
  });
});
