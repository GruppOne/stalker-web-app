export class PlaceData {
  private address: string;
  private city: string;
  private zipcode: number;
  private state: string;

  constructor(
    address = 'Vicolo nero',
    city = 'Venezia',
    zipcode = 31044,
    state = 'Italia',
  ) {
    this.address = address;
    this.city = city;
    this.zipcode = zipcode;
    this.state = state;
  }

  getAddress(): string {
    return this.address;
  }

  getCity(): string {
    return this.city;
  }

  getZipCode(): number {
    return this.zipcode;
  }

  getState(): string {
    return this.state;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  setCity(city: string): void {
    this.city = city;
  }

  setZipCode(zipcode: number): void {
    this.zipcode = zipcode;
  }

  setState(state: string): void {
    this.state = state;
  }
}
