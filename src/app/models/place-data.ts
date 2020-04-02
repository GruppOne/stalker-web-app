export class PlaceData {
  private address: string;
  private city: string;
  private zipcode: string;
  private state: string;

  constructor(
    address = 'Via Trieste, 63',
    city = 'Padova',
    zipcode = '35131',
    state = 'Italia',
  ) {
    this.address = address;
    this.city = city;
    this.zipcode = zipcode;
    this.state = state;
  }

  get Address(): string {
    return this.address;
  }
  set Address(address: string) {
    this.address = address;
  }

  get City(): string {
    return this.city;
  }
  set City(city: string) {
    this.city = city;
  }

  get Zipcode(): string {
    return this.zipcode;
  }
  set Zipcode(zipcode: string) {
    this.zipcode = zipcode;
  }

  get State(): string {
    return this.state;
  }
  set State(state: string) {
    this.state = state;
  }
}
