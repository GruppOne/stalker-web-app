import {LdapConfiguration} from './ldapConfiguration';

export interface OrganizationData {
  readonly name: string;
  readonly organizationType: string;
  readonly description?: string;
  readonly ldapConfiguration?: LdapConfiguration;
  readonly creationDateTime?: string;
  readonly lastChangeDateTime?: string;
}

export class OrganizationDataBuilder {
  private description?: string;

  private ldapConfiguration?: LdapConfiguration;

  private creationDateTime?: string;

  private lastChangeDateTime?: string;

  constructor(private name: string, private organizationType: string) {}

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
  // Use this code if you need to remove a Place
  /*  removePlace(place: Place): OrganizationDataBuilder {
    const index: number = this.places?.indexOf(place, 0) as number;
    this.places = this.places?.splice(index, 1);
    return this;
  } */
  addOrganizationType(organizationType: string): OrganizationDataBuilder {
    this.organizationType = organizationType;
    return this;
  }
  addCreatedDate(creationDateTime: string): OrganizationDataBuilder {
    this.creationDateTime = creationDateTime;
    return this;
  }
  addLastModifiedDate(lastChangeDateTime: string): OrganizationDataBuilder {
    this.lastChangeDateTime = lastChangeDateTime;
    return this;
  }

  build(): OrganizationData {
    return {
      name: this.name,
      description: this.description,
      ldapConfiguration: this.ldapConfiguration,
      organizationType: this.organizationType,
      creationDateTime: this.creationDateTime,
      lastChangeDateTime: this.lastChangeDateTime,
    };
  }
}
