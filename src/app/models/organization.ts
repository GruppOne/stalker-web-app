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

  addName(name: string): OrganizationBuilder {
    this.name = name;
    return this;
  }
  addId(id: number): OrganizationBuilder {
    this.id = id;
    return this;
  }
  addDescription(description: string): OrganizationBuilder {
    this.description = description;
    return this;
  }
  addLdapConfiguration(ldapConfiguration: LdapConfiguration): OrganizationBuilder {
    this.ldapConfiguration = ldapConfiguration;
    return this;
  }
  addPlaces(places: Place[]): OrganizationBuilder {
    if (this.places) {
      this.places = this.places?.concat(places);
    } else {
      this.places = places;
    }
    return this;
  }
  // FIXME builders should NOT have methods for removing stuff
  removePlace(place: Place): OrganizationBuilder {
    const index: number = this.places?.indexOf(place, 0) as number;
    this.places = this.places?.splice(index, 1);
    return this;
  }
  addIsPrivate(isPrivate: boolean): OrganizationBuilder {
    this.isPrivate = isPrivate;
    return this;
  }
  addCreatedDate(createdDate: string): OrganizationBuilder {
    this.createdDate = createdDate;
    return this;
  }
  addLastModifiedDate(lastModifiedDate: string): OrganizationBuilder {
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
