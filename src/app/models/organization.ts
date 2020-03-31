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
    name = 'Organizzazione di prova',
    description = 'Lorem ipsum dolor sit amet, consectetur adipisci elit,' +
      'sed eiusmod tempor incidunt ut labore et dolore magna aliqua.',
    ldapConfiguration = new LdapConfiguration(),
    places = [new Place()],
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

  get Id(): number {
    return this.id;
  }
  set Id(id: number) {
    this.id = id;
  }

  get Name(): string {
    return this.name;
  }
  set Name(name: string) {
    this.name = name;
  }

  get Description(): string {
    return this.description;
  }
  set Description(description: string) {
    this.description = description;
  }

  get LdapConfiguration(): LdapConfiguration {
    return this.ldapConfiguration;
  }
  set LdapConfiguration(ldapConfiguration: LdapConfiguration) {
    this.ldapConfiguration = ldapConfiguration;
  }

  get Places(): Place[] {
    return this.places;
  }
  set Places(places: Place[]) {
    this.places = places;
  }

  get IsPrivate(): boolean {
    return this.isPrivate;
  }
  set IsPrivate(isPrivate: boolean) {
    this.isPrivate = isPrivate;
  }

  get CreatedDate(): string {
    return this.createdDate;
  }
  set CreatedDate(createdDate: string) {
    this.createdDate = createdDate;
  }

  get LastModifiedDate(): string {
    return this.lastModifiedDate;
  }
  set LastModifiedDate(lastModifiedDate: string) {
    this.lastModifiedDate = lastModifiedDate;
  }
}
