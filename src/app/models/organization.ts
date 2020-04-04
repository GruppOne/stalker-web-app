import {LdapConfiguration} from './ldapConfiguration';
import {Place} from './place';

export interface Organization {
  readonly id?: number;
  readonly name: string;
  readonly description?: string;
  readonly ldapConfiguration?: LdapConfiguration;
  places?: Place[];
  readonly isPrivate: boolean;
  readonly createdDate?: string;
  readonly lastModifiedDate?: string;
}

export class OrganizationBuilder {
  private id?: number;
  private description?: string;

  private ldapConfiguration?: LdapConfiguration;

  private places?: Place[];

  private createdDate?: string;

  private lastModifiedDate?: string;

  constructor(private name: string, private isPrivate: boolean) {}

  setName(name: string): OrganizationBuilder {
    this.name = name;
    return this;
  }
  setId(id: number): OrganizationBuilder {
    this.id = id;
    return this;
  }
  setDescription(description: string): OrganizationBuilder {
    this.description = description;
    return this;
  }
  setldapConfiguration(ldapConfiguration: LdapConfiguration): OrganizationBuilder {
    this.ldapConfiguration = ldapConfiguration;
    return this;
  }
  addPlaces(places: Place[]): OrganizationBuilder {
    if (places) {
      this.places = this.places?.concat(places);
    } else {
      this.places = places;
    }
    return this;
  }
  removePlace(place: Place): OrganizationBuilder {
    const index: number = this.places?.indexOf(place, 0) as number;
    this.places = this.places?.splice(index, 1);
    return this;
  }
  setIsPrivate(isPrivate: boolean): OrganizationBuilder {
    this.isPrivate = isPrivate;
    return this;
  }
  setCreatedDate(createdDate: string): OrganizationBuilder {
    this.createdDate = createdDate;
    return this;
  }
  setLastModifiedDate(lastModifiedDate: string): OrganizationBuilder {
    this.lastModifiedDate = lastModifiedDate;
    return this;
  }

  build(): Organization {
    return {
      id: this.id,
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
