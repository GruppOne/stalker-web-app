import {LdapConfiguration} from '../models/ldapConfiguration';
import {Organization} from '../models/organization';
import {Place} from '../models/place';

describe('Organization', () => {
  const organization = new Organization();
  it('should create an instance', () => {
    expect(new Organization()).toBeTruthy();
  });
  it('should set and get fields correctly', () => {
    const newId = -2;
    const newName = 'NewTest';
    const newDescription = 'Test description';
    const newLdapConfiguration = new LdapConfiguration();
    const newPlaces = [new Place()];
    const newIsPrivate = false;
    const newCreatedDate = '2020-05-21';
    const newLastModifiedDate = '2020-05-21';
    organization.Id = newId;
    organization.Name = newName;
    organization.Description = newDescription;
    organization.LdapConfiguration = newLdapConfiguration;
    organization.Places = newPlaces;
    organization.IsPrivate = newIsPrivate;
    organization.CreatedDate = newCreatedDate;
    organization.LastModifiedDate = newLastModifiedDate;
    expect(organization.Id).toEqual(newId);
    expect(organization.Name).toEqual(newName);
    expect(organization.Description).toEqual(newDescription);
    expect(organization.LdapConfiguration).toEqual(newLdapConfiguration);
    expect(organization.Places).toEqual(newPlaces);
    expect(organization.IsPrivate).toEqual(newIsPrivate);
    expect(organization.CreatedDate).toEqual(newCreatedDate);
    expect(organization.LastModifiedDate).toEqual(newLastModifiedDate);
  });
});
