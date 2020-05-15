import {Place} from '../places/place';

import {LdapConfiguration} from './ldapConfiguration';

export interface OrganizationData {
  readonly name: string;
  readonly isPrivate: boolean;
  readonly description?: string;
  readonly ldapConfiguration?: LdapConfiguration;
  places?: Place[];
  readonly createdDate?: string;
  readonly lastModifiedDate?: string;
}

export class OrganizationDataBuilder {
  private description?: string;

  private ldapConfiguration?: LdapConfiguration;

  private places?: Place[];

  private createdDate?: string;

  private lastModifiedDate?: string;

  constructor(private name: string, private isPrivate: boolean) {}

  addName(name: string): OrganizationDataBuilder {
    this.name = name;
    return this;
  }
  addDescription(description: string): OrganizationDataBuilder {
    this.description = description;
    return this;
  }
  addLdapConfiguration(ldapConfiguration: LdapConfiguration): OrganizationDataBuilder {
    this.ldapConfiguration = ldapConfiguration;
    return this;
  }
  addPlaces(places: Place[]): OrganizationDataBuilder {
    if (this.places) {
      this.places = this.places.concat(places);
    } else {
      this.places = places;
    }
    return this;
  }
  // Use this code if you need to remove a Place
  /*  removePlace(place: Place): OrganizationDataBuilder {
    const index: number = this.places?.indexOf(place, 0) as number;
    this.places = this.places?.splice(index, 1);
    return this;
  } */
  addIsPrivate(isPrivate: boolean): OrganizationDataBuilder {
    this.isPrivate = isPrivate;
    return this;
  }
  addCreatedDate(createdDate: string): OrganizationDataBuilder {
    this.createdDate = createdDate;
    return this;
  }
  addLastModifiedDate(lastModifiedDate: string): OrganizationDataBuilder {
    this.lastModifiedDate = lastModifiedDate;
    return this;
  }

  build(): OrganizationData {
    return {
      name: this.name,
      description: this.description,
      ldapConfiguration: this.ldapConfiguration,
      places: this.places,
      isPrivate: this.isPrivate,
      createdDate: this.createdDate,
      lastModifiedDate: this.lastModifiedDate,
    };
  }
}
