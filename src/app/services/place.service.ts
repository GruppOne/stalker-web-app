import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface Geocoding {
  address: {
    building: string;
    road: string;
    city: string;
    postcode: string;
    country: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  // private stalkerEndpoint: StalkerEndpoint;

  constructor(private httpClient: HttpClient) {
    // this.stalkerEndpoint = new StalkerEndpoint(httpClient, '/place');
  }

  /*   getPlaceById(placeId: number): Observable<HttpResponse<Place>> {
    this.stalkerEndpoint.setPath('/place/' + placeId.toString());
    return this.stalkerEndpoint
      .get<Place>();
  } */

  reverseGeocoding(lat: number, lng: number): Observable<Geocoding> {
    return this.httpClient.get<Geocoding>(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    );
  }
}
