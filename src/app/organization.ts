import {LdapConfiguration} from './ldapConfiguration';
import {Place} from './place';

export class Organization {
  private id: number;
  private name: string;
  private description: string;
  private ldapConfiguration: LdapConfiguration;
  private places: Place[];
  private isPrivate: boolean;
  private createdDate: string;
  private lastModifiedDate: string;
  constructor(
    id = -1,
    name = 'Prova',
    description = 'Descrizione di prova',
    ldapConfiguration = new LdapConfiguration(),
    places = [],
    isPrivate = true,
    createdDate = '2010-05-21',
    lastModifiedDate = '2019-01-22',
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.ldapConfiguration = ldapConfiguration;
    this.places = places;
    this.isPrivate = isPrivate;
    this.createdDate = createdDate;
    this.lastModifiedDate = lastModifiedDate;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getldapConfiguration(): LdapConfiguration {
    return this.ldapConfiguration;
  }

  getPlaces(): Place[] {
    return this.places;
  }

  getPrivate(): boolean {
    return this.isPrivate;
  }

  getCreatedDate(): string {
    return this.createdDate;
  }

  getLastModifiedDate(): string {
    return this.lastModifiedDate;
  }

  setId(id: number): void {
    this.id = id;
  }

  setName(name: string): void {
    this.name = name;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setLdapConfiguration(ldapConfiguration: LdapConfiguration): void {
    this.ldapConfiguration = ldapConfiguration;
  }

  setPlaces(places: Place[]): void {
    this.places = places;
  }

  setPrivate(isPrivate: boolean): void {
    this.isPrivate = isPrivate;
  }

  setCreatedDate(createdDate: string): void {
    this.createdDate = createdDate;
  }

  setLastModifiedDate(lastModifiedDate: string): void {
    this.lastModifiedDate = lastModifiedDate;
  }
}
