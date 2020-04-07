import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface Geocoding {
  display_name: string;
  address: {
    building?: string;
    university?: string;
    school?: string;
    city: string;
    country: string;
    postcode: string;
    road: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  // private readonly stalkerEndpoint: StalkerEndpoint;

  constructor(private readonly httpClient: HttpClient) {
    // this.stalkerEndpoint = new StalkerEndpoint(httpClient, '/place');
  }

  reverseGeocoding(lat: number, lng: number): Observable<Geocoding> {
    return this.httpClient.get<Geocoding>(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    );
  }
}
