import {MyLatLng} from '../places/my-lat-lng';
import {PlaceBuilder} from '../places/place';
import {PlaceDataBuilder} from '../places/place-data';

import {LdapConfigurationBuilder} from './ldapConfiguration';
import {OrganizationBuilder} from './organization';
import {OrganizationDataBuilder} from './organization-data';

const testPlaceInfo = {
  address: 'test',
  city: 'test',
  zipcode: 'test',
  state: 'test',
};

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
    const newPlaces = [
      new PlaceBuilder(
        1,
        new PlaceDataBuilder(testPlaceInfo, 'test', [new MyLatLng(1, 1)], 10).build(),
      ).build(),
      new PlaceBuilder(
        1,
        new PlaceDataBuilder(testPlaceInfo, 'test', [new MyLatLng(1, 1)], 10).build(),
      ).build(),
    ];
    const newIsPrivate = false;
    const newCreatedDate = 1;
    const newLastModifiedDate = 1;
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
    organizationBuilder.addOrganizationData(organizationDataBuilder.build());
    const organization = organizationBuilder.build();
    expect(organization.id).toEqual(newId);
    expect(organization.data.name).toEqual(newName);
    expect(organization.data.description).toEqual(newDescription);
    expect(organization.data.ldapConfiguration).toEqual(newLdapConfiguration);
    expect(organization.data.places).toEqual(organization.data.places);
    expect(organization.data.isPrivate).toEqual(newIsPrivate);
    expect(organization.data.creationDateTime).toEqual(newCreatedDate);
    expect(organization.data.lastChangeDateTime).toEqual(newLastModifiedDate);
  });
});
