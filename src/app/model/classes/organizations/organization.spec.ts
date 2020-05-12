import {PlaceBuilder} from '../places/place';

import {LdapConfigurationBuilder} from './ldapConfiguration';
import {OrganizationBuilder} from './organization';
import {OrganizationDataBuilder} from './organization-data';

describe('Organization', () => {
  let organizationBuilder = new OrganizationBuilder(
    1,
    new OrganizationDataBuilder('imola', true).build(),
  );
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
    const organizationDataBuilder = new OrganizationDataBuilder(newName, newIsPrivate);
    organizationBuilder.addId(newId);
    organizationDataBuilder.addName(newName);
    organizationDataBuilder.addDescription(newDescription);
    organizationDataBuilder.addLdapConfiguration(newLdapConfiguration);
    organizationDataBuilder.addPlaces(newPlaces);
    organizationDataBuilder.addPlaces(newPlaces);
    organizationDataBuilder.addIsPrivate(newIsPrivate);
    organizationDataBuilder.addCreatedDate(newCreatedDate);
    organizationDataBuilder.addLastModifiedDate(newLastModifiedDate);
    organizationBuilder = new OrganizationBuilder(newId, organizationDataBuilder.build());
    const organization = organizationBuilder.build();
    expect(organization.id).toEqual(newId);
    expect(organization.organizationData.name).toEqual(newName);
    expect(organization.organizationData.description).toEqual(newDescription);
    expect(organization.organizationData.ldapConfiguration).toEqual(newLdapConfiguration);
    expect(organization.organizationData.places).toEqual(
      organization.organizationData.places,
    );
    expect(organization.organizationData.isPrivate).toEqual(newIsPrivate);
    expect(organization.organizationData.createdDate).toEqual(newCreatedDate);
    expect(organization.organizationData.lastModifiedDate).toEqual(newLastModifiedDate);
  });
});
