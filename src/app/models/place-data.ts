export interface PlaceData {
  readonly address: string;
  readonly city: string;
  readonly zipcode: number;
  readonly state: string;
}

export class PlaceDataBuilder {
  constructor(
    private address: string,
    private city: string,
    private zipcode: number,
    private state: string,
  ) {}
  addAddress(address: string): PlaceDataBuilder {
    this.address = address;
    return this;
  }
  addCity(city: string): PlaceDataBuilder {
    this.city = city;
    return this;
  }
  addZipcode(zipcode: number): PlaceDataBuilder {
    this.zipcode = zipcode;
    return this;
  }
  addState(state: string): PlaceDataBuilder {
    this.state = state;
    return this;
  }
  build(): PlaceData {
    return {
      address: this.address,
      city: this.city,
      zipcode: this.zipcode,
      state: this.state,
    };
  }
}