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
  // TODO should use a different word because "set" is the one used in setters.
  setAddress(address: string): PlaceDataBuilder {
    this.address = address;
    return this;
  }
  setCity(city: string): PlaceDataBuilder {
    this.city = city;
    return this;
  }
  setZipcode(zipcode: number): PlaceDataBuilder {
    this.zipcode = zipcode;
    return this;
  }
  setState(state: string): PlaceDataBuilder {
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
