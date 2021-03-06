import {OrganizationData} from './organization-data';

export interface Organization {
  readonly id: number;
  readonly data: OrganizationData;
  readonly placeIds?: number[];
}

export class OrganizationBuilder {
  constructor(private id: number, private organizationData: OrganizationData) {}

  addId(id: number): OrganizationBuilder {
    this.id = id;
    return this;
  }

  addOrganizationData(organizationData: OrganizationData): OrganizationBuilder {
    this.organizationData = organizationData;
    return this;
  }

  build(): Organization {
    return {
      id: this.id,
      data: this.organizationData,
      placeIds: [],
    };
  }
}
